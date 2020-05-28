'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    'Setting',
    {
      setname: DataTypes.STRING,
      settingGroupId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  Setting.associate = function (models) {
    Setting.belongsTo(models.SettingGroup, {
      foreignKey: {
        name: 'settingGroupId',
      },
    });
    Setting.hasMany(models.Category, {
      foreignKey: 'typeId',
      as: 'Categories',
    });
    Setting.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'Users',
    });
  };
  return Setting;
};
