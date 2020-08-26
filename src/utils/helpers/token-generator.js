const jwt = require('jsonwebtoken')
const MissingParamsError = require('../errors/missing-params-error')

module.exports = class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    if (!this.secret) {
      throw new MissingParamsError('secret')
    }
    if (!id) {
      throw new MissingParamsError('id')
    }
    return jwt.sign(id, this.secret)
  }
}
