const Category = require('../models/category');

const readCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({'message': err.message});
  }
};

const createCategory = async (req, res) => {
  try {
    const category =  req.body;
    if (!category || !category.name) {
      return res.status(400).json({ message: 'Name is missing' });
    }
    const categoryCreated =  await Category.create ({
      ...category
    });
    res.send(categoryCreated);
    res.status(201).json(categoryCreated);
  } catch (err) {
    if (err && err.errors && err.errors.length > 0){
      err.errors = err.errors.map (error => {
        const {message, path, value, type} = error;
        return {
          tag: `TAG_${type.replace(/\s+/g, '_').toUpperCase()}`,
          message: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
          field: path,
          value
        };
      });
    }
    res.status(500).json({'errors': err.errors});
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = Number (req.params.id);
    const category =  req.body;
    if (!category || !category.name) {
      return res.status(400).json({ message: 'Name is missing' });
    }
    const categoryFound = await Category.findByPk (id);
    if (!categoryFound || !categoryFound.id) {
      return res.status(404).json({ message: 'Not found' });
    }
    categoryFound.name = category.name;
    categoryFound.description = category.description;
    const categoryUpdate = await categoryFound.save({ fields: ['name', 'description'] });
    res.status(200).json(categoryUpdate);
  } catch (err) {
    if (err && err.errors && err.errors.length > 0){
      err.errors = err.errors.map (error => {
        const {message, path, value, type} = error;
        return {
          tag: `TAG_${type.replace(/\s+/g, '_').toUpperCase()}`,
          message: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
          field: path,
          value
        };
      });
    }
    res.status(500).json({'errors': err.errors});
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = Number (req.params.id);
    const rowsDeleted = await Category.destroy({ where: { id: id } });
    if (rowsDeleted > 0){
      res.status(204).end();
    }
    else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    if (err && err.errors && err.errors.length > 0){
      err.errors = err.errors.map (error => {
        const {message, path, value, type} = error;
        return {
          tag: `TAG_${type.replace(/\s+/g, '_').toUpperCase()}`,
          message: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
          field: path,
          value
        };
      });
    }
    res.status(500).json({'errors': err.errors});
  }
};

// Additional methods

const readCategoryById = async (req, res) => {
  try {
    const id = Number (req.params.id);
    const categoryFound = await Category.findByPk (id);
    if (!categoryFound || !categoryFound.id) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(categoryFound);
  } catch (err) {
    res.status(500).json({'message': err.message});
  }
};

module.exports = { readCategories, createCategory, updateCategory, deleteCategory, readCategoryById };
