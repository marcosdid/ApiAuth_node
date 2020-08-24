class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('Should return true if validtor returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@gemail.com')
    expect(isEmailValid).toBe(true)
  })
})
