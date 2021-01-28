const BaseService = require('./base.service');
class TrainingPathService extends BaseService {
  constructor({ TrainingPathBusiness }) {
    super(TrainingPathBusiness);
  }

  async getUserCourses(userId) {
    const trainingPath = await this._entityBusiness.getUserCourses(userId);
    return trainingPath;
  }

  async getUserInactiveCourse(userId, courseId) {
    const trainingPath = await this._entityBusiness.getUserInactiveCourse(
      userId,
      courseId
    );
    return trainingPath;
  }

  async getMostEnrolledCourses() {
    const courses = await this._entityBusiness.getMostEnrolledCourses();
    return courses;
  }

  async getMostEnrolledUsers() {
    const users = await this._entityBusiness.getMostEnrolledUsers();
    return users;
  }
}

module.exports = TrainingPathService;
