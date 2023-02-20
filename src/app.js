/**  @description Used CommonJS as Module System */
const express  = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const { configs } = require('./configs/configs');
const categoriesRoutes = require('./routes/categories.routes');
const noticesRoutes = require('./routes/notices.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(session({
  secret: configs.secretSession,
  cookie: { maxAge: Number (configs.sessionTimeout) }
}));

require('./controllers/auth');

// Routes
const router = express.Router ();
app.use (configs.pathInitial, router);
router.use ('/categories', categoriesRoutes );
router.use ('/notices', noticesRoutes );
router.use ('/users', usersRoutes );
router.use ('/auth', authRoutes );

module.exports = app;
