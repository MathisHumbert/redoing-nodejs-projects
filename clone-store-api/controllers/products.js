const { query } = require('express');
const Products = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const { name, company, featured, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  // find
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }
  if (company) {
    queryObj.company = { $regex: company, $options: 'i' };
  }
  if (featured) {
    queryObj.featured = featured;
  }

  // filters
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regex = /\b(<|>|>=|<=|=)\b/g;

    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      console.log(field, operator, value);
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  const result = Products.find(queryObj);

  // sort
  if (sort) {
    const sortItems = sort.split(',').join(' ');
    result.sort(sortItems);
  } else {
    result.sort('createdAt');
  }

  // select / fields
  if (fields) {
    const fieldsItem = fields.split(',').join(' ');
    result.select(fieldsItem);
  }

  // skip & limit
  const limit = Number(req.query.limit) || 10;
  const skip = Number(req.query.skip) || 1;
  const page = (skip - 1) * limit;
  result.skip(page).limit(limit);

  const products = await result;

  res.status(200).send({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const products = await Products.find({});

  res.status(200).send({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
