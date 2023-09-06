// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const orm_login = require('./ORM/ORM_login'); // Update this path

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await orm_login.verifyLogin(username, password);
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  // Fetch user by username (adjust this as per your logic)
  const user = await orm_login.getUserByUsername(username);
  done(null, user);
});
