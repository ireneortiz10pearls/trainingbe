'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrainingPath = sequelize.define(
    'TrainingPath',
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  TrainingPath.associate = function (models) {
    TrainingPath.belongsTo(models.Course, {
      foreignKey: {
        name: 'courseId',
      },
    });
    TrainingPath.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
      },
    });
    TrainingPath.hasMany(models.TrainingPathStatus, {
      foreignKey: 'trainingPathId',
      as: 'TrainingPathStatuses',
    });
  };
  return TrainingPath;
};
