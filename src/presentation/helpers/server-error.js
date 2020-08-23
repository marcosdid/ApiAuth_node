module.exports = class ServerError extends Error {
  constructor (paramsName) {
    super('Internal error')
    this.name = 'ServerError'
  }
}
