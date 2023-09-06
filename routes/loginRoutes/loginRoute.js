const express = require('express');
const orm_login = require('../../ORM/ORM_login');
// const orm_emp_info = require('../../ORM/ORM_employee_info');
const checkCookie = require('../../authentication/cookie_checker');
const {loginController} = require('../../controllers/login_page_controllers/logincontroller'); // Import the loginController function
require('dotenv').config();
const passport = require('passport');
const router = express.Router();
const orm_emp_info = require('../../ORM/ORM_employee_info');

// router.post('/api/v0/login', async (req, res) => { //post->get
//     // console.log("Backend: requested-> /api/v0/login");
//     // req_json = req.body;
//     console.log("loginRoute");
//     console.log(req.body);
//     const pseudo_view = await loginController(req);
//     if(pseudo_view) {
//         console.log('Login route: User found!');
//         console.log(pseudo_view);
//         res.status(200).json({message : 'Success', data : pseudo_view});
//     }
//     else {
//         res.status(401).json({error : 'Invalid Login'});
//     }
// });

router.post('/api/v0/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({ error: 'Invalid login' }); }
  
      req.logIn(user, async (err) => {
        if (err) { return next(err); }
  
        // Replace this logic to fetch doctor/intern/receptionist info
        let model = null;
            if(user.user_role.toUpperCase() == 'DOCTOR') {
                model = await orm_emp_info.get_doctor_info(user.username);
            }
            else if(user.user_role.toUpperCase() == 'INTERN') {
                model = await orm_emp_info.get_intern_info(user.username);
            }
            else if(user.user_role.toUpperCase() == 'RECEPTIONIST') {
                model = await orm_emp_info.get_receptionist_info(user.username);
            }
    
            console.log(model);
    
            const pseudo_view = {
                username : user.username,
                role : user.user_role,
                info : model,
            };
            
            console.log(pseudo_view);
    
        //     return pseudo_view;

        // const userInfo = await yourLogicToFetchAdditionalUserInfo(user);
  
        return res.status(200).json({
          message: 'Authenticated',
          user: pseudo_view,
        });
      });
    })(req, res, next);
  });


module.exports = router;