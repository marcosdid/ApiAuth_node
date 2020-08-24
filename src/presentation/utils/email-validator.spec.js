const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const MakeSut = () => {
  return new EmailValidator()
}
describe('Email Validator', () => {
  test('Should return true if validtor returns true', () => {
    const sut = MakeSut()
    const isEmailValid = sut.isValid('valid_email@gemail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validtor returns false', () => {
    validator.isEmailValid = false
    const sut = MakeSut()
    const isEmailValid = sut.isValid('invalid_email@gmail.com')
    expect(isEmailValid).toBe(false)
  })
})
