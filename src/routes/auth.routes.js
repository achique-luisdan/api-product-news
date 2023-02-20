const express = require ('express');
const passport = require('passport');

const {
  restrictAccess,
  continueAccess
} = require('../middlewares/auth.guards');

const router = express.Router ();

router.post('/login',
  passport.authenticate('local', {session: false}),
  restrictAccess,
  continueAccess
);

module.exports = router;
