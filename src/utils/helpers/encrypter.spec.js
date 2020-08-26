const bcrypt = require('bcrypt')

class Encryper {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encryper()
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(true)
  })

  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encryper()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(false)
  })
})
