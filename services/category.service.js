const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    const rta = await models.Category.create(data);
    return rta;
  }

  async find() {
    const rta = await models.Category.findAll({
      include: ['products'],
    });
    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    const rta = await category.destroy(changes);
    return rta;
  }
}

module.exports = CategoryService;
