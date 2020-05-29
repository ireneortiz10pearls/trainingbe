const mapper = require('automapper-js');
const { TrainingPathDto } = require('../dtos');

class TrainingPathController {
  constructor({ TrainingPathService }) {
    this._trainingpathService = TrainingPathService;
  }

  async getTrainingPaths(req, res) {
    let trainingpaths = await this._trainingpathService.getAllWithCategory();
    trainingpaths = trainingpaths.map((trainingpath) =>
      mapper(TrainingPathDto, trainingpath)
    );
    return res.send({
      payload: trainingpaths,
    });
  }

  async getTrainingPath(req, res) {
    const { id } = req.params;
    let trainingpath = await this._trainingpathService.getWithCategory(id);
    if (!trainingpath) {
      return res.status(404).send();
    }
    trainingpath = mapper(TrainingPathDto, trainingpath);
    return res.send({
      payload: trainingpath,
    });
  }

  async createTrainingPath(req, res) {
    const { body } = req;
    const createdTrainingPath = await this._trainingpathService.create(body);
    const trainingpath = mapper(TrainingPathDto, createdTrainingPath);
    return res.status(201).send({
      payload: trainingpath,
    });
  }

  async updateTrainingPath(req, res) {
    const { body } = req;
    const { id } = req.params;

    await this._trainingpathService.update(id, body);
    return res.status(204).send();
  }

  async deleteTrainingPath(req, res) {
    const { id } = req.params;

    await this._trainingpathService.delete(id);
    return res.status(204).send();
  }
}

module.exports = TrainingPathController;
