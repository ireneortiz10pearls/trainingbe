const mapper = require('automapper-js');
const { CourseDto } = require('../dtos');

class CourseController {
  constructor({ CourseService, TrainingPathService }) {
    this._courseService = CourseService;
    this._trainingpathService = TrainingPathService;
  }

  async getCourses(req, res) {
    try {
      let courses = await this._courseService.getAllWithCategory();
      courses = courses.map((course) => mapper(CourseDto, course));
      return res.send({
        payload: courses,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getAvailableCourses(req, res) {
    try {
      const { userId } = req.params;
      let courses = await this._courseService.getAll();
      let userCourses = await this._trainingpathService.getUserCourses(userId);

      if (userCourses) {
        userCourses.forEach((userCourse) => {
          courses = courses.filter(
            (course) => course.id !== userCourse.courseId
          );
        });
      }

      courses = courses.map((course) => mapper(CourseDto, course));
      return res.send({
        payload: courses,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getCourse(req, res) {
    try {
      const { id } = req.params;
      let course = await this._courseService.getWithCategory(id);
      if (!course) {
        return res.status(404).send();
      }
      course = mapper(CourseDto, course);
      return res.send({
        payload: course,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getAllByCategory(req, res) {
    try {
      const { categoryid } = req.params;
      let course = await this._courseService.getAllByCategory(categoryid);
      if (!course) {
        return res.status(404).send();
      }
      course = mapper(CourseDto, course);
      return res.send({
        payload: course,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getAllByKeyWord(req, res) {
    try {
      const { keyword } = req.params;
      let course = await this._courseService.getAllByKeyWord(keyword);
      if (!course) {
        return res.status(404).send();
      }
      course = mapper(CourseDto, course);
      return res.send({
        payload: course,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getLastCreatedCourses(req, res) {
    try {
      let course = await this._courseService.getLastCreatedCourses();
      if (!course) {
        return res.status(404).send();
      }
      course = mapper(CourseDto, course);
      return res.send({
        payload: course,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getAllByKeyWordAndCategory(req, res) {
    try {
      const { categoryid, keyword } = req.params;
      let course = await this._courseService.getAllByKeyWordAndCategory(
        categoryid,
        keyword
      );
      if (!course) {
        return res.status(404).send();
      }
      course = mapper(CourseDto, course);
      return res.send({
        payload: course,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async createCourse(req, res) {
    try {
      const { body } = req;
      const createdCourse = await this._courseService.create(body);
      const course = mapper(CourseDto, createdCourse);
      return res.status(201).send({
        payload: course,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async updateCourse(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;

      await this._courseService.update(id, body);
      return res.status(204).send();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;

      await this._courseService.delete(id);
      return res.status(204).send();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }
}

module.exports = CourseController;
