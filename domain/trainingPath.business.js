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
}

module.exports = TrainingPathBusiness;
