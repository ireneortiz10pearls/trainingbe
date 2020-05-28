const BaseService = require('./base.service');
class SettingService extends BaseService {
  constructor({ SettingBusiness }) {
    super(SettingBusiness);
  }

  async getSettingByName(name) {
    const setting = await this._entityBusiness.getSettingByName(name);
    return setting;
  }

  async getList(name) {
    const settings = await this._entityBusiness.getList(name);
    return settings;
  }
}

module.exports = SettingService;
