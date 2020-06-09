const BaseBusiness = require('./base.business');
const { TrainingPathStatus } = require('./models');
const mapper = require('automapper-js');

class TrainingPathStatusBusiness extends BaseBusiness {
  constructor({ TrainingPathStatusRepository }) {
    super(TrainingPathStatusRepository, TrainingPathStatus);
  }
  async getStatusByChapterTrainingPath(trainingPathId, chapterId) {
    const trainingPathStatus = await this._entityRepository.getStatusByChapterTrainingPath(
      trainingPathId,
      chapterId
    );
    if (trainingPathStatus.length <= 0) return null;
    return mapper(TrainingPathStatus, trainingPathStatus);
  }
}

module.exports = TrainingPathStatusBusiness;
