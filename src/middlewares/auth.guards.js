const jwt = require('jsonwebtoken');

const { configs } = require('../configs/configs');
const { finishSession} = require('../controllers/users.service');

async function restrictAccess (err, req, res, next) {
  if (err){
    res.status(401).json(err);
  }else {
    next();
  }
}

async function continueAccess (req, res, next) {
  try {
    const user = req.user;
    const payload = {
      sub: user.id,
      sessionId: user.sessionId
    };
    const token = jwt.sign(payload, configs.secret);
    req.session.sessionId = user.sessionId;
    res.json({ id: user.id, token});
  } catch (error) {
    next(error);
  }
};

async function validateSessionTime (req, res, next) {
  if (!req.session.sessionId){
    await finishSession(req.user.sub);
    res.status(401).json({
      message: 'Your session has expired'
    });
    next('restrictAccess');
  }
  next();
}

module.exports = { restrictAccess, continueAccess, validateSessionTime };
