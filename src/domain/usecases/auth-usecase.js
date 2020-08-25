const MissingParamsError = require('../../utils/errors/missing-params-error')

module.exports = class AuthUseCase {
  constructor (loadUserByEmailRepository, escrypter) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.escrypter = escrypter
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    if (!password) {
      throw new MissingParamsError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)

    if (!user) {
      return null
    }

    await this.escrypter.compare(password, user.password)
    return null
  }
}
