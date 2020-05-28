var models = require('../models');
class BaseRepository {
  constructor(db, entity) {
    this._db = db;
    this.entity = entity;
  }

  getAll() {
    return this._db[this.entity].findAll({ where: { isActive: true } });
  }

  getAllWithSetting() {
    return this._db[this.entity].findAll({
      where: { isActive: true },
      include: [
        {
          model: models.Setting,
        },
      ],
    });
  }

  get(id) {
    return this._db[this.entity].findOne({ where: { id, isActive: true } });
  }

  getWithSetting(id) {
    return this._db[this.entity].findOne({
      where: { id, isActive: true },
      include: [
        {
          model: models.Setting,
        },
      ],
    });
  }

  create(entity) {
    return this._db[this.entity].create(entity);
  }

  update(id, entity) {
    delete entity.createdAt;
    delete entity.updatedAt;
    return this._db[this.entity].update(entity, {
      where: { id, isActive: true },
    });
  }

  delete(id) {
    return this._db[this.entity].destroy({ where: { id, isActive: true } });
  }
}

module.exports = BaseRepository;
