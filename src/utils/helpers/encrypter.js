const bcrypt = require('bcrypt')
const MissingParamsError = require('../errors/missing-params-error')

module.exports = class Encryper {
  async compare (value, hash) {
    if (!value) {
      throw new MissingParamsError('value')
    }
    if (!hash) {
      throw new MissingParamsError('hash')
    }
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
