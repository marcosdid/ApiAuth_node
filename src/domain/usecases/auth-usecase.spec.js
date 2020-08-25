const MissingParamsError = require('../../utils/errors/missing-params-error')

class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    if (!password) {
      throw new MissingParamsError('password')
    }
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamsError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@gmail.com')
    expect(promise).rejects.toThrow(new MissingParamsError('password'))
  })
})
