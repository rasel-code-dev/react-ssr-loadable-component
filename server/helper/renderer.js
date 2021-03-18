import path from "path"
import React from 'react'

import { ChunkExtractor } from '@loadable/server'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import App from '../../src/App'



const webStats = path.resolve('./build/static/loadable-stats.json')
const webExtractor = new ChunkExtractor({ statsFile: webStats })
 

export default (req, store)=>{

  const jsx = webExtractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}} >
        <App/>
      </StaticRouter>
    </Provider>
  )
  const content = renderToString(jsx)
  const helmet = Helmet.renderStatic()

  return `
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="themes" content="#f43454">
      ${helmet.meta.toString()}
      ${helmet.title.toString()}
      ${webExtractor.getLinkTags()}
      ${webExtractor.getStyleTags()}
      <link rel="shortcut icon" type="image/jpg" href="/public/favicon.ico"/>
    </head>
    <body>
      <div id="backdrop"></div>
      <div id="modal-root"></div>
      <div id="root">${content}</div>
     
      ${webExtractor.getScriptTags()}
      <script>
        window.INITIAL_STATE = ${JSON.stringify(store.getState())}
      </script>
      <script src="//localhost:35729/livereload.js?snipver=1" async="" defer=""></script>
    </body>
  </html>
` 


}