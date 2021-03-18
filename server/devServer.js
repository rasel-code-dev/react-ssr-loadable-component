
import liveReload from 'livereload'
import connectLiveReload from 'connect-livereload'

export default  (app)=>{
  const liveReloadServer = liveReload.createServer()
  liveReloadServer.watch("build")

  liveReloadServer.server.once("connection", ()=>{
    setTimeout(()=>{
      liveReloadServer.refresh("/")
    }, 100)
  })

  app.use(connectLiveReload())
}