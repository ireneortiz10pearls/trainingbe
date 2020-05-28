const BaseService = require('./base.service');
class CourseChapterService extends BaseService {
  constructor({ CourseChapterBusiness }) {
    super(CourseChapterBusiness);
  }

  async getChaptersByCourseId(courseId) {
    const chapters = await this._entityBusiness.getChaptersByCourseId(courseId);
    return chapters;
  }
}

module.exports = CourseChapterService;
