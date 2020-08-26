const bcrypt = require('bcrypt')

module.exports = class Encryper {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
