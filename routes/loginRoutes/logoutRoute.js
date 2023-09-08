const express = require('express');
const router = express.Router();


// router.get('/api/v0/logout', (req, res) => {
//   req.logout();
//   req.session.destroy((err) => {
//     if (err) {
//       // handle error
//       return res.status(500).json({ message: 'Could not log out, please try again.' });
//     }
//     // Send a JSON response to indicate successful logout
//     res.json({ message: 'Successfully logged out' });
//   });
// });
const ensureAuthenticated = require('../../authentication/ensure-auth');
router.get('/api/v0/logout', ensureAuthenticated, (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({ message: 'Successfully logged out' });
  });

});
  
module.exports = router;
