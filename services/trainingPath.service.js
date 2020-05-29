const BaseService = require('./base.service');
class TrainingPathService extends BaseService {
  constructor({ TrainingPathBusiness }) {
    super(TrainingPathBusiness);
  }

  async getUserCourses(userId) {
    const trainingPath = await this._entityBusiness.getUserCourses(userId);
    return trainingPath;
  }
}

module.exports = TrainingPathService;
