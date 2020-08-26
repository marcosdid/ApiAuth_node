const MissingParamsError = require('../../utils/errors/missing-params-error')

module.exports = class AuthUseCase {
  constructor ({
    loadUserByEmailRepository,
    updateAccessTokenRepository,
    encrypter,
    tokenGenerator
  } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    if (!password) {
      throw new MissingParamsError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)

    const isValid =
      user && (await this.encrypter.compare(password, user.password))
    if (isValid) {
      const accessToken = await this.tokenGenerator.generate(user.id)
      await this.updateAccessTokenRepository.update(user.id, accessToken)
      return accessToken
    }
    return null
  }
}
