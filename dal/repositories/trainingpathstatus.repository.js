const BaseRepository = require('./base.repository');

class TrainingPathStatusRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'TrainingPathStatus');
  }
  getStatusByChapterTrainingPath(trainingPathId, chapterId) {
    return this._db[this.entity].findOne({
      where: {
        isActive: true,
        trainingPathId: trainingPathId,
        chapterId: chapterId,
      },
    });
  }
}

module.exports = TrainingPathStatusRepository;
