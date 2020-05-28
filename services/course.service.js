const BaseService = require('./base.service');
class CourseService extends BaseService {
  constructor({ CourseBusiness }) {
    super(CourseBusiness);
  }

  async getAllWithCategory() {
    const courses = await this._entityBusiness.getAllWithCategory();
    return courses;
  }

  async getWithCategory(id) {
    const course = await this._entityBusiness.getWithCategory(id);
    return course;
  }
}

module.exports = CourseService;
