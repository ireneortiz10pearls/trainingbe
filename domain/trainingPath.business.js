const BaseBusiness = require('./base.business');
const { TrainingPath } = require('./models');

class TrainingPathBusiness extends BaseBusiness {
  constructor({ TrainingPathRepository }) {
    super(TrainingPathRepository, TrainingPath);
  }
}

module.exports = TrainingPathBusiness;
