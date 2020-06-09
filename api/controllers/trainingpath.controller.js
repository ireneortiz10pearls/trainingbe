const mapper = require('automapper-js');
const {
  TrainingPathDto,
  CourseChapterDto,
  TrainingPathStatusDto,
} = require('../dtos');

class TrainingPathController {
  constructor({
    TrainingPathService,
    CourseChapterService,
    TrainingPathStatusService,
  }) {
    this._trainingpathService = TrainingPathService;
    this._courseChapterService = CourseChapterService;
    this._trainingPathStatusService = TrainingPathStatusService;
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
      let trainingpaths = await this._trainingpathService.getUserCourses(
        userId
      );
      if (!trainingpaths) {
        return res.status(404).send();
      }
      trainingpaths = await Promise.all(
        trainingpaths.map(async (trainingpath) => {
          let courseChapters = await this._courseChapterService.getChaptersByCourseId(
            trainingpath.courseId
          );
          let value = 0.0;
          if (courseChapters) {
            let total = await courseChapters.reduce(
              function (acumulator, nextValue) {
                return {
                  length: acumulator.length + nextValue.length,
                };
              },
              { length: 0 }
            );

            let lengthCompleted = 0;

            courseChapters = courseChapters.map((courseChapter) => {
              let statuses = courseChapter.TrainingPathStatuses;
              let isDone = statuses.filter(
                (status) =>
                  status.trainingPathId == trainingpath.id &&
                  status.TrainingPath.userId == trainingpath.userId &&
                  status.isActive === true
              );

              if (isDone.length > 0) {
                lengthCompleted = lengthCompleted + courseChapter.length;
              }
            });
            trainingpath = mapper(TrainingPathDto, trainingpath);
            value = (lengthCompleted / total.length) * 100;
          }
          value = value.toFixed(2);
          trainingpath.percentage = value;
          return trainingpath;
        })
      );

      return res.send({
        payload: trainingpaths,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getUserChaptersByCourseId(req, res) {
    try {
      const { trainingPathId, courseId, userId } = req.params;
      let courseChapters = await this._courseChapterService.getChaptersByCourseId(
        courseId
      );

      if (courseChapters) {
        courseChapters.sort((a, b) => (a.order > b.order ? 1 : -1));

        courseChapters = courseChapters.map((courseChapter) => {
          let statuses = courseChapter.TrainingPathStatuses;
          let isDone = statuses.filter(
            (status) =>
              status.trainingPathId == trainingPathId &&
              status.TrainingPath.userId == userId &&
              status.isActive === true
          );

          courseChapter = mapper(CourseChapterDto, courseChapter);

          if (isDone.length > 0) {
            courseChapter.isDone = true;
            let dateFinished = isDone[0].dateFinished;
            let strDateFinished =
              dateFinished.getFullYear() +
              '-' +
              (dateFinished.getMonth() + 1) +
              '-' +
              dateFinished.getDate();
            courseChapter.dateFinished = strDateFinished;
          }

          return courseChapter;
        });
      } else {
        return res.status(404).send();
      }
      return res.send({
        payload: courseChapters,
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

      return res.send({
        payload: coursesArr,
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

  async createBatchTrainingPathStatus(req, res) {
    try {
      const { chapterArr, formData } = req.body;

      chapterArr.forEach(async (chapterId) => {
        let body = { ...formData, chapterId: chapterId };
        await this._trainingPathStatusService.create(body);
      });

      return res.send({
        payload: chapterArr,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async createTrainingPathStatus(req, res) {
    try {
      const { body } = req;

      let createdStatus = await this._trainingPathStatusService.create(body);
      createdStatus = mapper(TrainingPathStatusDto, createdStatus);
      return res.status(201).send({
        payload: createdStatus,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async updateTrainingPathStatus(req, res) {
    try {
      const { body } = req;
      const { trainingPathId, chapterId } = req.params;
      let trainingPathStatus = await this._trainingPathStatusService.getStatusByChapterTrainingPath(
        trainingPathId,
        chapterId
      );

      if (trainingPathStatus) {
        await this._trainingPathStatusService.update(
          trainingPathStatus.id,
          body
        );
        return res.status(204).send();
      } else {
        return res.status(404).send();
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }
}

module.exports = TrainingPathController;
