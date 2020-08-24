module.exports = class MissingParamsError extends Error {
  constructor (paramsError) {
    super(`missing params: ${paramsError}`)
    this.name = 'MissingParamsError'
  }
}
