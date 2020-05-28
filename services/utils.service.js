const { ADMIN } = require('./types');

class UtilsService {
  constructor({ UserService, SettingService }) {
    this._userService = UserService;
    this._settingService = SettingService;
  }

  async isAdmin(id) {
    let userLogged = await this._userService.get(id);
    let setting = await this._settingService.getSettingByName(ADMIN);

    if (setting && userLogged.roleId === setting[0].id) {
      return true;
    }
    return false;
  }
}

module.exports = UtilsService;
