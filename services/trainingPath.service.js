const BaseService = require('./base.service');
class TrainingPathService extends BaseService {
  constructor({ TrainingPathBusiness }) {
    super(TrainingPathBusiness);
  }
}

module.exports = TrainingPathService;
