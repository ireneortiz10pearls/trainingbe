const BaseRepository = require('./base.repository');

class CategoryRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Category');
  }
}

module.exports = CategoryRepository;
