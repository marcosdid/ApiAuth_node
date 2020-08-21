const LoginRouter = require('./login-routes')
const MissingParamsError = require('../helpers/missing-params-error')

describe('Login Router', () => {
  test('should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    var httpRequest = {
      body: {
        password: 'limarignfd'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('email'))
  })

  test('should return 400 if no password is provided', () => {
    const sut = new LoginRouter()
    var httpRequest = {
      body: {
        email: 'limarignfd'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('password'))
  })

  test('should return 500 if no httpRequest is provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return 500 if httpRequest has no body', () => {
    const sut = new LoginRouter()
    var httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
