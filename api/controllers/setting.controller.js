const mapper = require('automapper-js');
const { SettingDto } = require('../dtos');

class SettingController {
  constructor({ SettingService }) {
    this._settingService = SettingService;
  }

  async getSettings(req, res) {
    let settings = await this._settingService.getAll();
    settings = settings.map((setting) => mapper(SettingDto, setting));
    return res.send({
      payload: settings,
    });
  }

  async getList(req, res) {
    const { name } = req.params;
    let settings = await this._settingService.getList(name);
    settings = settings.map((setting) => mapper(SettingDto, setting));
    return res.send({
      payload: settings,
    });
  }

  async getSetting(req, res) {
    const { id } = req.params;
    let setting = await this._settingService.getWithSetting(id);
    if (!setting) {
      return res.status(404).send();
    }
    setting = mapper(SettingDto, setting);
    return res.send({
      payload: setting,
    });
  }
}
module.exports = SettingController;
