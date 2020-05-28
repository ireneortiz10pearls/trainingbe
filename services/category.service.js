const BaseService = require('./base.service');
class CategoryService extends BaseService {
  constructor({ CategoryBusiness }) {
    super(CategoryBusiness);
  }
}

module.exports = CategoryService;
