const express = require ('express');
const passport = require('passport');

const {
  readCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  readCategoryById
} = require('../controllers/category.controller');
const { validateSessionTime } = require('../middlewares/auth.guards');

const router = express.Router ();

router.get( '/', readCategories);

router.use(passport.authenticate('jwt', {session: false}));
router.use(validateSessionTime);

router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/:id', readCategoryById);

module.exports = router;
