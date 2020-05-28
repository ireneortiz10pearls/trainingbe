const BaseService = require('./base.service');
class SettingGroupService extends BaseService {
  constructor({ SettingGroupBusiness }) {
    super(SettingGroupBusiness);
  }
}

module.exports = SettingGroupService;
