function ensureAuthenticated(req, res, next) {
    if (process.env.NODE_ENV !== 'testing') {
      if (req.isAuthenticated()) {
        return next();
      } else {
        return res.status(401).json({ message: 'You are not authenticated' });
      }
    } else {
      return next();
    }
  }
  

  module.exports = ensureAuthenticated;