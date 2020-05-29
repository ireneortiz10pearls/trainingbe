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

  async getAllByCategory(categoryId) {
    const course = await this._entityBusiness.getAllByCategory(categoryId);
    return course;
  }

  async getAllByKeyWord(keyWord) {
    const course = await this._entityBusiness.getAllByKeyWord(keyWord);
    return course;
  }

  async getAllByKeyWordAndCategory(categoryId, keyWord) {
    const course = await this._entityBusiness.getAllByKeyWordAndCategory(
      categoryId,
      keyWord
    );
    return course;
  }
}

module.exports = CourseService;
