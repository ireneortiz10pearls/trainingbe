const BaseRepository = require('./base.repository');

class TrainingPathRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'TrainingPath');
  }
}

module.exports = TrainingPathRepository;
