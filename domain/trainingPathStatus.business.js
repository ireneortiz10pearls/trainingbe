const BaseBusiness = require('./base.business');
const { TrainingPathStatus } = require('./models');

class TrainingPathStatusBusiness extends BaseBusiness {
  constructor({ TrainingPathStatusRepository }) {
    super(TrainingPathStatusRepository, TrainingPathStatus);
  }
}

module.exports = TrainingPathStatusBusiness;
