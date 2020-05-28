const BaseRepository = require('./base.repository');

class TrainingPathStatusRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'TrainingPathStatus');
  }
}

module.exports = TrainingPathStatusRepository;
