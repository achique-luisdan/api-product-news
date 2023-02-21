const express = require ('express');
const passport = require('passport');

const {
  readNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  readNoticeById
} = require('../controllers/notice.controller');
const { validateSessionTime } = require('../middlewares/auth.guards');

const router = express.Router ();

router.get('/', readNotices);

router.use(passport.authenticate('jwt', {session: false}));
router.use(validateSessionTime);

router.post('/', createNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);
router.get('/:id', readNoticeById);

module.exports = router;
