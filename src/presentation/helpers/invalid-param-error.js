module.exports = class InvalidParamError extends Error {
  constructor (paramsError) {
    super(`invalid params: ${paramsError}`)
    this.name = 'MissingParamsError'
  }
}
