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

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *      - Categories
 *     summary: "Read notices"
 *     description:  Endpoint for everything
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Category"
 *       '400':
 *         description: Invalid status value
 */
router.get( '/', readCategories);

router.use(passport.authenticate('jwt', {session: false}));
router.use(validateSessionTime);

router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/:id', readCategoryById);

module.exports = router;
