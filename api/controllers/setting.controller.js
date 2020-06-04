const mapper = require('automapper-js');
const { SettingDto } = require('../dtos');

class SettingController {
  constructor({ SettingService }) {
    this._settingService = SettingService;
  }

  async getSettings(req, res) {
    try {
      let settings = await this._settingService.getAll();
      settings = settings.map((setting) => mapper(SettingDto, setting));
      return res.send({
        payload: settings,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getList(req, res) {
    try {
      const { name } = req.params;
      let settings = await this._settingService.getList(name);
      settings = settings.map((setting) => mapper(SettingDto, setting));
      return res.send({
        payload: settings,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getSetting(req, res) {
    try {
      const { id } = req.params;
      let setting = await this._settingService.get(id);
      if (!setting) {
        return res.status(404).send();
      }
      setting = mapper(SettingDto, setting);
      return res.send({
        payload: setting,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }
}
module.exports = SettingController;
