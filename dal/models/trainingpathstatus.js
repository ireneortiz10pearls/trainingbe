'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrainingPathStatus = sequelize.define(
    'TrainingPathStatus',
    {
      trainingPathId: DataTypes.INTEGER,
      chapterId: DataTypes.INTEGER,
      dateFinished: DataTypes.DATE,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  TrainingPathStatus.associate = function (models) {
    TrainingPathStatus.belongsTo(models.TrainingPath, {
      foreignKey: {
        name: 'trainingPathId',
      },
    });
    TrainingPathStatus.belongsTo(models.CourseChapter, {
      foreignKey: {
        name: 'chapterId',
      },
    });
  };
  return TrainingPathStatus;
};
