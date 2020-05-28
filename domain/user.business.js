const mapper = require('automapper-js');
const BaseBusiness = require('./base.business');
const { User } = require('./models');

class UserBusiness extends BaseBusiness {
  constructor({ UserRepository }) {
    super(UserRepository, User);
  }

  async getUsersByEmail(email) {
    const user = await this._entityRepository.getUsersByEmail(email);
    if (user.length <= 0) return null;
    return mapper(User, user);
  }
}

module.exports = UserBusiness;
