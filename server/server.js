import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import { StaticRouter } from 'react-router-dom'
const app = express()

import App from '../src/App'

app.use(express.static("build"));
app.use("/public", express.static("public"));

app.get("/api/users", (req, res)=>{
  res.send([{name: 'Rasel Mahmud'}])
})


const webStats = path.resolve('./build/static/loadable-stats.json')

app.get('*', (req, res) => {

  const webExtractor = new ChunkExtractor({ statsFile: webStats })
  const jsx = webExtractor.collectChunks(<StaticRouter location={req.url} context={{}}><App/></StaticRouter>)

  const html = renderToString(jsx)  

  res.set('content-type', 'text/html')
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>
        <link rel="shortcut icon" type="image/jpg" href="/public/favicon.ico"/>
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="main">${html}</div>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
    `)
})


app.listen(9000, () => console.log('Server started http://localhost:9000'))

