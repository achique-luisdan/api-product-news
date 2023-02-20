const express = require ('express');

const {
  registerUser
} = require('../controllers/users.service');

const router = express.Router ();

router.post('/', registerUser);

module.exports = router;
