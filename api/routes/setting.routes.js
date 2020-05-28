const { Router } = require('express');

module.exports = function ({ SettingController }) {
  const router = Router();

  router.get('/', SettingController.getSettings.bind(SettingController));
  router.get('/:id', SettingController.getSetting.bind(SettingController));
  router.get('/list/:name', SettingController.getList.bind(SettingController));

  return router;
};
