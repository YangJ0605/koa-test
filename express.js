const http = require('http')
const url = require('url')

const router = []

class Application {
  get(path, handler) {
    router.push({
      path,
      method:'get',
      handler
    })
  }

  listen() {
    const server = http.createServer((req, res) => {
      const {pathname} = url.parse(req.url, true)
      for(let route of router) {
        const {path, method, handler} = route
        if(pathname === path && req.method.toLowerCase() === method) {
          return handler(req, res)
        }
      }
    })
    server.listen(...arguments)
  }
}


module.exports = () => {
  return new Application()
}