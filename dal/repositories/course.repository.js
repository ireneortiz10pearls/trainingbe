const BaseRepository = require('./base.repository');
var models = require('../models');
const { Op } = require('sequelize');

class CourseRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Course');
  }

  getWithCategory(id) {
    return this._db[this.entity].findOne({
      where: { id, isActive: true },
      include: [
        {
          model: models.Category,
        },
      ],
    });
  }

  getAllWithCategory() {
    return this._db[this.entity].findAll({
      where: { isActive: true },
      order: [['id', 'ASC']],
      include: [
        {
          model: models.Category,
        },
      ],
    });
  }

  getLastCreatedCourses() {
    return this._db[this.entity].findAll({
      limit: 8,
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: models.Category,
        },
      ],
    });
  }

  getAllByCategory(categoryId) {
    return this._db[this.entity].findAll({
      where: { isActive: true },
      order: [['id', 'ASC']],
      include: [
        {
          model: models.Category,
          where: { id: categoryId },
        },
      ],
    });
  }

  getAllByKeyWord(keyWord) {
    return this._db[this.entity].findAll({
      where: {
        isActive: true,
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${keyWord}%`,
            },
          },
          {
            tags: {
              [Op.iLike]: `%${keyWord}%`,
            },
          },
        ],
      },
      order: [['id', 'ASC']],
      include: [
        {
          model: models.Category,
        },
      ],
    });
  }

  getAllByKeyWordAndCategory(categoryId, keyWord) {
    return this._db[this.entity].findAll({
      where: {
        isActive: true,
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${keyWord}%`,
            },
          },
          {
            tags: {
              [Op.iLike]: `%${keyWord}%`,
            },
          },
        ],
      },
      order: [['id', 'ASC']],
      include: [
        {
          model: models.Category,
          where: { id: categoryId },
        },
      ],
    });
  }
}

module.exports = CourseRepository;
