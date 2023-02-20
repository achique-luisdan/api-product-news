const { configs } = require('../configs/configs');
const jwt = require('jsonwebtoken');

function validateKey (req, res, next) {
  const key = req.headers['api_key'];
  if (key && key === configs.apiKey){
    next();
  }
  else {
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
}

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
    };
    const token = jwt.sign(payload, configs.secret);
    res.json({ id: user.id, token});
  } catch (error) {
    next(error);
  }
};

module.exports = { validateKey, restrictAccess, continueAccess };
