const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
    };
    const { limit, offset, priceMin, priceMax } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (priceMin && priceMax) {
      options.where = {
        price: {
          [Op.gte]: priceMin,
          [Op.lte]: priceMax,
        },
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    const rta = await product.destroy(id);
    return rta;
  }
}

module.exports = ProductsService;
