class Encryper {
  async compare (password, hashedPassword) {
    return true
  }
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encryper()
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })
})
