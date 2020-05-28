'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {}
  );
  Category.associate = function (models) {
    Category.belongsTo(models.Setting, {
      foreignKey: {
        name: 'typeId',
      },
    });
  };
  return Category;
};
