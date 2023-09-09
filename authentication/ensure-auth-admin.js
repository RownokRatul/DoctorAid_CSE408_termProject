function ensureAdmin(req, res, next) {
    if (process.env.NODE_ENV !== 'testing') {
        if (req.user && req.user.user_role === 'admin') {
        return next();
        } else {
        res.status(403).send('Unauthorized');
        }
    } else {
        return next();
    }
  }

  module.exports = ensureAdmin;