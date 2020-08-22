const LoginRouter = require('./login-routes')
const MissingParamsError = require('../helpers/missing-params-error')
const UnauthorizedError = require('../helpers/unauthorizedError')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  authUseCaseSpy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCaseSpy)
  return { sut, authUseCaseSpy }
}

describe('Login Router', () => {
  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    var httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should call AuthUseCsase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    var httpRequest = {
      body: {
        email: 'any_email@outlook.com',
        password: 'limarignfd'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('should return 401 when invalid credentials are provided', () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = null
    var httpRequest = {
      body: {
        email: 'invalid_email@outlook.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('should return 200 when valid credentials are provided', () => {
    const { sut } = makeSut()
    var httpRequest = {
      body: {
        email: 'valid_email@outlook.com',
        password: 'valid_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('should return 500 if no AuthUseCase is provided', () => {
    const sut = new LoginRouter()
    var httpRequest = {
      body: {
        email: 'any_email@outlook.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return 500 if no AuthUseCase has no auth method', () => {
    class AuthUseCaseSpy {}
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)
    var httpRequest = {
      body: {
        email: 'any_email@outlook.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
