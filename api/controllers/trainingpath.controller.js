const mapper = require('automapper-js');
const { TrainingPathDto } = require('../dtos');

class TrainingPathController {
  constructor({ TrainingPathService }) {
    this._trainingpathService = TrainingPathService;
  }

  async getTrainingPaths(req, res) {
    try {
      let trainingpaths = await this._trainingpathService.getAllWithCourse();
      trainingpaths = trainingpaths.map((trainingpath) =>
        mapper(TrainingPathDto, trainingpath)
      );
      return res.send({
        payload: trainingpaths,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getTrainingPath(req, res) {
    try {
      const { id } = req.params;
      let trainingpath = await this._trainingpathService.getWithCourse(id);
      if (!trainingpath) {
        return res.status(404).send();
      }
      trainingpath = mapper(TrainingPathDto, trainingpath);
      return res.send({
        payload: trainingpath,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getUserCourses(req, res) {
    try {
      const { userId } = req.params;
      let trainingpath = await this._trainingpathService.getUserCourses(userId);
      if (!trainingpath) {
        return res.status(404).send();
      }
      trainingpath = mapper(TrainingPathDto, trainingpath);
      return res.send({
        payload: trainingpath,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async createTrainingPath(req, res) {
    try {
      const { coursesArr, userId } = req.body;

      coursesArr.forEach(async (courseId) => {
        let body = { courseId: courseId, userId: userId, isActive: true };
        await this._trainingpathService.create(body);
      });
      let trainingpath = await this._trainingpathService.getUserCourses(userId);
      if (!trainingpath) {
        return res.status(404).send();
      }
      trainingpath = mapper(TrainingPathDto, trainingpath);
      return res.send({
        payload: trainingpath,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async updateTrainingPath(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;

      await this._trainingpathService.update(id, body);
      return res.status(204).send();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async deleteTrainingPath(req, res) {
    try {
      const { coursesArr, userId } = req.body;

      coursesArr.forEach(async (item) => {
        let trainingPath = await this._trainingpathService.get(item);
        let body = {
          id: item,
          courseId: trainingPath.courseId,
          userId: userId,
          isActive: false,
        };
        await this._trainingpathService.update(item, body);
      });
      let trainingpath = await this._trainingpathService.getUserCourses(userId);
      if (!trainingpath) {
        return res.status(404).send();
      }
      trainingpath = mapper(TrainingPathDto, trainingpath);
      return res.send({
        payload: trainingpath,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }
}

module.exports = TrainingPathController;
