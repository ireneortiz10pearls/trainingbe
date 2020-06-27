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
          include: {
            model: models.Category,
          },
        },
        {
          model: models.TrainingPathStatus,
          as: 'TrainingPathStatuses',
          include: [{ all: true, nested: false }],
        },
      ],
    });
  }

  getMostEnrolledCourses() {
    return this._db[this.entity].findAll({
      limit: 8,
      attributes: [
        'courseId',
        [
          models.Sequelize.fn('COUNT', models.Sequelize.col('courseId')),
          'courseCount',
        ],
      ],
      group: ['TrainingPath.courseId', 'Course.id', 'Course->Category.id'],
      raw: true,
      include: [
        {
          model: models.Course,
          include: {
            model: models.Category,
          },
        },
      ],
      order: [
        [
          models.Sequelize.fn('COUNT', models.Sequelize.col('courseId')),
          'DESC',
        ],
      ],
    });
  }

  getMostEnrolledUsers() {
    return this._db[this.entity].findAll({
      limit: 8,
      attributes: [
        'userId',
        [
          models.Sequelize.fn('COUNT', models.Sequelize.col('userId')),
          'userCount',
        ],
      ],
      group: ['TrainingPath.userId', 'User.id'],
      raw: true,
      include: [
        {
          model: models.User,
        },
      ],
      order: [
        [models.Sequelize.fn('COUNT', models.Sequelize.col('userId')), 'DESC'],
      ],
    });
  }
}

module.exports = TrainingPathRepository;
