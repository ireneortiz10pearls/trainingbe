'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      title: DataTypes.STRING,
      link: DataTypes.STRING,
      tags: DataTypes.STRING,
      description: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  Course.associate = function (models) {
    Course.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
      },
    });
    Course.hasMany(models.CourseChapter, {
      foreignKey: 'courseId',
      as: 'CourseChapters',
    });
    Course.hasMany(models.TrainingPath, {
      foreignKey: 'courseId',
      as: 'TrainingPaths',
    });
    Course.hasMany(models.Tag, {
      foreignKey: 'courseId',
      as: 'Tags',
    });
  };
  return Course;
};
