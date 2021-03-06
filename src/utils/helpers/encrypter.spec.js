jest.mock('bcrypt', () => ({
  isValid: true,

  async compare (value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  }
}))

const Encryper = require('./encrypter')
const bcrypt = require('bcrypt')
const MissingParamsError = require('../errors/missing-params-error')

const makeSut = () => {
  return new Encryper()
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(true)
  })

  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hash_value')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hash_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hash_value')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamsError('value'))
    expect(sut.compare('any_value')).rejects.toThrow(
      new MissingParamsError('hash')
    )
  })
})
