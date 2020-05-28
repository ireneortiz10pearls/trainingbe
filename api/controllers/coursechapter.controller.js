const mapper = require('automapper-js');
const { CourseChapterDto } = require('../dtos');

class CourseChapterController {
  constructor({ CourseChapterService, UtilsService }) {
    this._courseChapterService = CourseChapterService;
    this._utilsService = UtilsService;
  }

  async getCourseChapters(req, res) {
    let courseChapters = await this._courseChapterService.getAll();
    courseChapters = courseChapters.map((courseChapter) =>
      mapper(CourseChapterDto, courseChapter)
    );
    return res.send({
      payload: courseChapters,
    });
  }

  async getCourseChapter(req, res) {
    const { id } = req.params;
    let courseChapter = await this._courseChapterService.get(id);
    if (!courseChapter) {
      return res.status(404).send();
    }
    courseChapter = mapper(CourseChapterDto, courseChapter);
    return res.send({
      payload: courseChapter,
    });
  }

  async getChaptersByCourseId(req, res) {
    const { id } = req.params;
    let courseChapters = await this._courseChapterService.getChaptersByCourseId(
      id
    );
    courseChapters = courseChapters.map((courseChapter) =>
      mapper(CourseChapterDto, courseChapter)
    );
    return res.send({
      payload: courseChapters,
    });
  }

  async createCourseChapter(req, res) {
    const { body } = req;

    try {
      let isAdmin = await this._utilsService.isAdmin(req.user.id);
      if (!isAdmin) {
        return res.status(400).json({
          errors: [
            { msg: 'User logged does not have access to this operation.' },
          ],
        });
      }

      const createdCourseChapter = await this._courseChapterService.create(
        body
      );
      const courseChapter = mapper(CourseChapterDto, createdCourseChapter);
      return res.status(201).send({
        payload: courseChapter,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }

  async updateCourseChapter(req, res) {
    const { body } = req;
    const { id } = req.params;

    await this._courseChapterService.update(id, body);
    return res.status(204).send();
  }

  async deleteCourseChapter(req, res) {
    const { id } = req.params;

    await this._courseChapterService.delete(id);
    return res.status(204).send();
  }
}

module.exports = CourseChapterController;
