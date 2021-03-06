const mapper = require('automapper-js');
const { CategoryDto } = require('../dtos');

class CategoryController {
  constructor({ CategoryService, UtilsService }) {
    this._categoryService = CategoryService;
    this._utilsService = UtilsService;
  }

  async getCategories(req, res) {
    try {
      let categories = await this._categoryService.getAllWithSetting();
      categories = categories.map((category) => mapper(CategoryDto, category));
      return res.send({
        payload: categories,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async getCategory(req, res) {
    try {
      const { id } = req.params;
      let category = await this._categoryService.getWithSetting(id);
      if (!category) {
        return res.status(404).send();
      }
      category = mapper(CategoryDto, category);
      return res.send({
        payload: category,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async createCategory(req, res) {
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

      const createdCategory = await this._categoryService.create(body);
      const category = mapper(CategoryDto, createdCategory);
      return res.status(201).send({
        payload: category,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }

  async updateCategory(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;

      await this._categoryService.update(id, body);
      return res.status(204).send();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      await this._categoryService.delete(id);
      return res.status(204).send();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error.');
    }
  }
}

module.exports = CategoryController;
