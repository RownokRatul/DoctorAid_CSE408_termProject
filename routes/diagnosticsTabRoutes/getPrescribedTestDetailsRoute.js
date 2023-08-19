const express = require('express');
// const orm_login = require('../../ORM/ORM_login');
// const orm_emp_info = require('../../ORM/ORM_employee_info');
const checkCookie = require('../../authentication/cookie_checker');
const {prescribedTestByTestIDController} = require('../../controllers/diagnostics_tab_controllers/getprescribedtestbytestidcontroller'); // Import the loginController function
require('dotenv').config();

const router = express.Router();

router.post('/api/v0/get_prescribed_test_by_test_id', async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/login");
    // req_json = req.body;
    console.log("diagnostics tab route details");
    console.log(req.body);
    const pseudo_view = await prescribedTestByTestIDController(req);
    if(pseudo_view) {
        console.log('Diagnostics tab Route: Test found!');
        console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(401).json({error : 'Invalid Login'});
    }
});

module.exports = router;