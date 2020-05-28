const BaseBusiness = require('./base.business');
const { SettingGroup } = require('./models');

class SettingGroupBusiness extends BaseBusiness {
  constructor({ SettingGroupRepository }) {
    super(SettingGroupRepository, SettingGroup);
  }
}

module.exports = SettingGroupBusiness;
