const BaseService = require('./base.service');
class UserService extends BaseService {
  constructor({ UserBusiness }) {
    super(UserBusiness);
  }

  async getUsersByEmail(email) {
    const user = await this._entityBusiness.getUsersByEmail(email);
    return user;
  }
}

module.exports = UserService;
