'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      roleId: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    User.belongsTo(models.Setting, {
      foreignKey: {
        name: 'roleId',
      },
    });
    User.hasMany(models.TrainingPath, {
      foreignKey: 'userId',
      as: 'TrainingPaths',
    });
  };
  return User;
};
