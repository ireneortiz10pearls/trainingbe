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
    });
  }
}

module.exports = CourseChapterRepository;
