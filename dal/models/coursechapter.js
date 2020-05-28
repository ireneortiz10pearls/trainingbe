'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseChapter = sequelize.define(
    'CourseChapter',
    {
      name: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
      length: DataTypes.INTEGER,
      percentage: DataTypes.DECIMAL,
      order: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  CourseChapter.associate = function (models) {
    CourseChapter.belongsTo(models.Course, {
      foreignKey: {
        name: 'courseId',
      },
    });
    CourseChapter.hasMany(models.TrainingPathStatus, {
      foreignKey: 'chapterId',
      as: 'TrainingPathStatuses',
    });
  };
  return CourseChapter;
};
