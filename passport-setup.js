const LocalStrategy = require('passport-local').Strategy;
// const orm_login = require('./ORM/ORM_login');


module.exports = function(passport) {
  passport.use(new LocalStrategy(
    async function(username, password, done) {
      const user = await orm_login.verifyLogin(username, password);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect credentials.' });
      }
    }
  ));
};
