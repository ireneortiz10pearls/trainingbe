const BaseService = require('./base.service');
class TrainingPathStatusService extends BaseService {
  constructor({ TrainingPathStatusBusiness }) {
    super(TrainingPathStatusBusiness);
  }
  async getStatusByChapterTrainingPath(trainingPathId, chapterId) {
    const trainingPathStatus = await this._entityBusiness.getStatusByChapterTrainingPath(
      trainingPathId,
      chapterId
    );
    return trainingPathStatus;
  }
}

module.exports = TrainingPathStatusService;
