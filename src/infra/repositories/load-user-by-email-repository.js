const MissingParamsError = require('../../utils/errors/missing-params-error')
const MongoHelper = require('../helpes/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      throw new MissingParamsError('email')
    }
    const db = await MongoHelper.getDb()
    const user = await db.collection('users').findOne(
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
