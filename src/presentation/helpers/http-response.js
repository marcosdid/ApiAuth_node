const MissingParamsError = require('./missing-params-error')
const UnauthorizedError = require('./unauthorizedError')

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

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static ok () {
    return {
      statusCode: 200
    }
  }
}
