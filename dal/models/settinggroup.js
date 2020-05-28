'use strict';
module.exports = (sequelize, DataTypes) => {
  const SettingGroup = sequelize.define(
    'SettingGroup',
    {
      name: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  SettingGroup.associate = function (models) {
    SettingGroup.hasMany(models.Setting, {
      foreignKey: 'settingGroupId',
      as: 'Settings',
    });
  };
  return SettingGroup;
};
