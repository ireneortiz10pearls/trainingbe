const BaseBusiness = require('./base.business');
const { Category } = require('./models');

class CategoryBusiness extends BaseBusiness {
  constructor({ CategoryRepository }) {
    super(CategoryRepository, Category);
  }
}

module.exports = CategoryBusiness;
