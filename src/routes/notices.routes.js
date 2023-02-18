const express = require ('express');

const { readNotices, createNotice, updateNotice, deleteNotice, readNoticeById } = require('../controllers/notice.controller');

const router = express.Router ();

router.get('/', readNotices);

router.post('/', createNotice);

router.put('/:id', updateNotice);

router.delete('/:id', deleteNotice);

router.get('/:id', readNoticeById);

module.exports = router;
