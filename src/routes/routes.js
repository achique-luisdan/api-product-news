const express = require ('express');

const { configs } = require('../../configs/configs');

const categoriesRoutes = require('./categories.routes');

const noticesRoutes = require('./notices.routes');

function routes (app){
  const router = express.Router ();
  app.use (configs.pathInitial, router);
  router.use ('/categories', categoriesRoutes );
  router.use ('/notices', noticesRoutes );
}

module.exports = routes;
