const MongoHelper = require('../helpes/mongo-helper')
const MissingParamsError = require('../../utils/errors/missing-params-error')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let userModel, fakeUserId

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    fakeUserId = fakeUser.ops[0]._id
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({
      _id: fakeUserId
    })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })
  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamsError('userId'))
    expect(sut.update(fakeUserId)).rejects.toThrow(
      new MissingParamsError('accessToken')
    )
  })
})
