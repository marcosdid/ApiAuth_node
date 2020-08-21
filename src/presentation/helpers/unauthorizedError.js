module.exports = class UnauthorizedError extends Error {
  constructor (paramsError) {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
