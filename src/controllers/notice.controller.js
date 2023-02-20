const { v4: uuidv4 } = require ('uuid');

const Notice = require('../models/notice');
const Category = require('../models/category');

async function readNotices(req, res) {
  try {
    const notices = await Notice.findAll({ include: Category });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

async function createNotice(req, res) {
  try {
    const notice = req.body;
    if (!notice || !notice.title) {
      return res.status(400).json({ message: 'Title is missing' });
    }
    const noticeCreated = await Notice.create({
      ...notice,
      id: uuidv4().slice(0, 6),
    });
    res.status(201).json(noticeCreated);
  } catch (err) {
    if (err && err.errors && err.errors.length > 0) {
      err.errors = err.errors.map(error => {
        const { message, path, value, type } = error;
        return {
          tag: `TAG_${type.replace(/\s+/g, '_').toUpperCase()}`,
          message: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
          field: path,
          value
        };
      });
    }
    res.status(500).json({ 'errors': err.errors });
  }
}

async function updateNotice(req, res) {
  try {
    const id = req.params.id;
    const notice = req.body;
    if (!notice || !notice.title) {
      return res.status(400).json({ message: 'Title is missing' });
    }
    const noticeFound = await Notice.findByPk(id);
    if (!noticeFound || !noticeFound.id) {
      return res.status(404).json({ message: 'Not found' });
    }
    noticeFound.set(notice);
    const noticeUpdate = await noticeFound.save({
      fields: ['title', 'content', 'imagen', 'categoryId']
    });
    res.status(200).json(noticeUpdate);
  } catch (err) {
    if (err && err.errors && err.errors.length > 0) {
      err.errors = err.errors.map(error => {
        const { message, path, value, type } = error;
        return {
          tag: `TAG_${type.replace(/\s+/g, '_').toUpperCase()}`,
          message: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
          field: path,
          value
        };
      });
    } if (err && err.name && err.original.detail) {
      const error = {
        tag: `TAG${err.name.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase().replace('_SEQUELIZE', '')}`,
        message: err.original.detail,
        field: 'categoryId',
        value: req.body.categoryId
      };
      res.status(500).json({ 'errors': [error] });
    }
    res.status(500).json({ 'errors': err.errors });
  }
}

async function deleteNotice(req, res) {
  try {
    const id = req.params.id;
    const rowsDeleted = await Notice.destroy({ where: { id: id } });
    if (rowsDeleted > 0) {
      res.status(204).end();
    }
    else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    if (err && err.errors && err.errors.length > 0) {
      err.errors = err.errors.map(error => {
        const { message, path, value, type } = error;
        return {
          tag: `TAG_${type.replace(/\s+/g, '_').toUpperCase()}`,
          message: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
          field: path,
          value
        };
      });
    }
    res.status(500).json({ 'errors': err.errors });
  }
}

// Additional methods

const readNoticeById = async (req, res) => {
  try {
    const id = req.params.id;
    const noticeFound = await Notice.findByPk (id);
    if (!noticeFound || !noticeFound.id) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(noticeFound);
  } catch (err) {
    res.status(500).json({'message': err.message});
  }
};

module.exports = {
  readNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  readNoticeById
};
