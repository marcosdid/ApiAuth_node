const MissingParamsError = require('./missing-params-error')

module.exports = class HttpResponse {
  static badRequest (paramsName) {
    return {
      statusCode: 400,
      body: new MissingParamsError(paramsName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}
