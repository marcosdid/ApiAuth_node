const MissingParamsError = require('../../utils/errors/missing-params-error')

module.exports = class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userID, accessToken) {
    if (!userID) {
      throw new MissingParamsError('userId')
    }
    if (!accessToken) {
      throw new MissingParamsError('accessToken')
    }
    await this.userModel.updateOne(
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
