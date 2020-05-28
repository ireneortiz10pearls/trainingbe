const BaseBusiness = require('./base.business');
const { CourseChapter } = require('./models');
const mapper = require('automapper-js');

class CourseChapterBusiness extends BaseBusiness {
  constructor({ CourseChapterRepository }) {
    super(CourseChapterRepository, CourseChapter);
  }

  async getChaptersByCourseId(courseId) {
    const chapters = await this._entityRepository.getChaptersByCourseId(
      courseId
    );
    if (chapters.length <= 0) return null;
    return mapper(CourseChapter, chapters);
  }
}

module.exports = CourseChapterBusiness;
