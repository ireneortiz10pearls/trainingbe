const BaseRepository = require('./base.repository');
var models = require('../models');

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
      include: [
        {
          model: models.Category,
        },
      ],
    });
  }
}

module.exports = CourseRepository;
