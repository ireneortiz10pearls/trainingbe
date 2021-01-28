const BaseBusiness = require('./base.business');
const { TrainingPath } = require('./models');
const mapper = require('automapper-js');

class TrainingPathBusiness extends BaseBusiness {
  constructor({ TrainingPathRepository }) {
    super(TrainingPathRepository, TrainingPath);
  }

  async getUserCourses(userId) {
    const trainingPath = await this._entityRepository.getUserCourses(userId);
    if (trainingPath.length <= 0) return null;
    return mapper(TrainingPath, trainingPath);
  }

  async getUserInactiveCourse(userId, courseId) {
    const trainingPath = await this._entityRepository.getUserInactiveCourse(
      userId,
      courseId
    );
    if (trainingPath.length <= 0) return null;
    return mapper(TrainingPath, trainingPath);
  }

  async getMostEnrolledCourses() {
    const courses = await this._entityRepository.getMostEnrolledCourses();
    if (courses.length <= 0) return null;
    return courses;
  }

  async getMostEnrolledUsers() {
    const users = await this._entityRepository.getMostEnrolledUsers();
    if (users.length <= 0) return null;
    return users;
  }
}

module.exports = TrainingPathBusiness;
