function ensureAdmin(req, res, next) {
    if (process.env.NODE_ENV !== 'testing') {
        if (req.user && req.user.user_role === 'admin') {
        return next();
        } else {
            return res.status(401).json({ message: 'You are not admin authenticated' });
        }
    } else {
        return next();
    }
  }

  module.exports = ensureAdmin;