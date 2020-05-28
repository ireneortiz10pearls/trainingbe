const BaseService = require('./base.service');
class TrainingPathStatusService extends BaseService {
  constructor({ TrainingPathStatusBusiness }) {
    super(TrainingPathStatusBusiness);
  }
}

module.exports = TrainingPathStatusService;
