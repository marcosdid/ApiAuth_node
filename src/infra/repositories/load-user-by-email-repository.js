const MissingParamsError = require('../../utils/errors/missing-params-error')
const MongoHelper = require('../helpes/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      throw new MissingParamsError('email')
    }
    const userModel = await MongoHelper.getCollection('users')
    const user = await userModel.findOne(
      {
        email
      },
      {
        projection: {
          password: 1
        }
      }
    )
    return user
  }
}
