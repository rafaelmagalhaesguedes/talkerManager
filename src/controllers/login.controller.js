const crypto = require('crypto');

module.exports = {
  getToken(_req, resp) {
    const token = crypto.randomBytes(8).toString('hex');
    return resp.status(200).json({ token });
  },
};