'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      courseId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  Tag.associate = function (models) {
    Tag.belongsTo(models.Course, {
      foreignKey: {
        name: 'courseId',
      },
    });
  };
  return Tag;
};
