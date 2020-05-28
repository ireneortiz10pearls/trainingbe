const mapper = require('automapper-js');
const BaseBusiness = require('./base.business');
const { Setting } = require('./models');

class SettingBusiness extends BaseBusiness {
  constructor({ SettingRepository }) {
    super(SettingRepository, Setting);
  }

  async getSettingByName(name) {
    const setting = await this._entityRepository.getSettingByName(name);
    if (setting.length <= 0) return null;
    return mapper(Setting, setting);
  }

  async getList(name) {
    const settings = await this._entityRepository.getList(name);
    if (settings.length <= 0) return null;
    return settings.map((setting) => mapper(Setting, setting.toJSON()));
  }
}

module.exports = SettingBusiness;
