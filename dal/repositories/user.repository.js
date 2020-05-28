const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'User');
  }

  getUsersByEmail(email) {
    return this._db[this.entity].findAll({
      where: {
        email: email,
        isActive: true,
      },
    });
  }
}

module.exports = UserRepository;
