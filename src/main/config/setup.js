module.exports = (app) => {
  app.disable('x-powered-by')
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-methods', '*')
    res.set('Access-Control-Allow-headers', '*')
    next()
  })
}
