const MissingParamsError = require('../../utils/errors/missing-params-error')
const MongoHelper = require('../helpes/mongo-helper')

module.exports = class UpdateAccessTokenRepository {
  async update (userID, accessToken) {
    if (!userID) {
      throw new MissingParamsError('userId')
    }
    if (!accessToken) {
      throw new MissingParamsError('accessToken')
    }
    const userModel = await MongoHelper.getCollection('users')
    await userModel.updateOne(
      {
        _id: userID
      },
      {
        $set: {
          accessToken
        }
      }
    )
  }
}
