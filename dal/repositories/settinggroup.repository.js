const BaseRepository = require('./base.repository');

class SettingGroupRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'SettingGroup');
  }
}

module.exports = SettingGroupRepository;
