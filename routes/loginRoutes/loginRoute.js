const express = require('express');
const orm_login = require('../../ORM/ORM_login');
// const orm_emp_info = require('../../ORM/ORM_employee_info');
const checkCookie = require('../../authentication/cookie_checker');
const {loginController} = require('../../controllers/logincontroller'); // Import the loginController function
require('dotenv').config();

const router = express.Router();

router.post('/api/v0/login', async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/login");
    // req_json = req.body;
    console.log("loginRoute");
    console.log(req.body);
    const pseudo_view = await loginController(req);
    if(pseudo_view) {
        console.log('Login route: User found!');
        console.log(pseudo_view);
        res.json(pseudo_view);
    }
    else {
        res.status(401).json({error : 'Invalid Login'});
    }
});

module.exports = router;