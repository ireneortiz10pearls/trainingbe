var models = require('../models');
const BaseRepository = require('./base.repository');

class CourseChapterRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'CourseChapter');
  }

  getChaptersByCourseId(courseId) {
    return this._db[this.entity].findAll({
      where: {
        courseId: courseId,
        isActive: true,
      },
      include: [
        {
          model: models.Course,
        },
        {
          model: models.TrainingPathStatus,
          as: 'TrainingPathStatuses',
          include: [{ all: true, nested: false }],
        },
      ],
    });
  }
}

module.exports = CourseChapterRepository;
