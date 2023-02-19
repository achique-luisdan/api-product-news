/**  @description Used CommonJS as Module System */
const express  = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { configs } = require('../configs/configs');
const categoriesRoutes = require('./routes/categories.routes');
const noticesRoutes = require('./routes/notices.routes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
const router = express.Router ();
app.use (configs.pathInitial, router);
router.use ('/categories', categoriesRoutes );
router.use ('/notices', noticesRoutes );

module.exports = app;
