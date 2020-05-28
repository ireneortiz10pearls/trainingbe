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
    TrainingPath.hasMany(models.TrainingPathStatus, {
      foreignKey: 'trainingPathId',
      as: 'TrainingPathStatuses',
    });
  };
  return TrainingPath;
};
