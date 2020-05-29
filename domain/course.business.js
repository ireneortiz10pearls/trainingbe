const BaseBusiness = require('./base.business');
const { Course } = require('./models');
const mapper = require('automapper-js');

class CourseBusiness extends BaseBusiness {
  constructor({ CourseRepository }) {
    super(CourseRepository, Course);
  }

  async getAllWithCategory() {
    const courses = await this._entityRepository.getAllWithCategory();
    if (courses.length <= 0) return null;
    return mapper(Course, courses);
  }

  async getWithCategory(id) {
    const course = await this._entityRepository.getWithCategory(id);
    if (!course) return null;
    return mapper(Course, course);
  }

  async getAllByCategory(categoryId) {
    const course = await this._entityRepository.getAllByCategory(categoryId);
    if (!course) return null;
    return mapper(Course, course);
  }

  async getAllByKeyWord(keyWord) {
    const course = await this._entityRepository.getAllByKeyWord(keyWord);
    if (!course) return null;
    return mapper(Course, course);
  }

  async getAllByKeyWordAndCategory(categoryId, keyWord) {
    const course = await this._entityRepository.getAllByKeyWordAndCategory(
      categoryId,
      keyWord
    );
    if (!course) return null;
    return mapper(Course, course);
  }
}

module.exports = CourseBusiness;
