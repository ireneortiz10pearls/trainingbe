const BaseRepository = require('./base.repository');
var models = require('../models');

class SettingRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Setting');
  }
  getSettingByName(name) {
    return this._db[this.entity].findAll({
      where: {
        setname: name,
        isActive: true,
      },
    });
  }

  getList(name) {
    return this._db[this.entity].findAll({
      where: { isActive: true },
      include: [
        {
          model: models.SettingGroup,
          where: { name: name },
        },
      ],
    });
  }
}

module.exports = SettingRepository;
