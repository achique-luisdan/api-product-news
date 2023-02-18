const express = require ('express');

const { readCategories, createCategory, updateCategory, deleteCategory, readCategoryById } = require('../controllers/category.controller');

const router = express.Router ();

router.get('/', readCategories);

router.post('/', createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

router.get('/:id', readCategoryById);

module.exports = router;
