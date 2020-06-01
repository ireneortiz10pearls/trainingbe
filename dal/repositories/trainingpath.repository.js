const BaseRepository = require('./base.repository');
var models = require('../models');

class TrainingPathRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'TrainingPath');
  }

  getUserCourses(userId) {
    return this._db[this.entity].findAll({
      where: { isActive: true, userId: userId },
      order: [['id', 'ASC']],
      include: [
        {
          model: models.Course,
        },
      ],
    });
  }
}

module.exports = TrainingPathRepository;
