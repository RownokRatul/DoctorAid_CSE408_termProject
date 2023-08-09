const express = require('express');
const orm_login = require('../../ORM/ORM_login');
const orm_emp_info = require('../../ORM/ORM_employee_info');
const checkCookie = require('../../authentication/cookie_checker');
require('dotenv').config();


const router = express.Router({mergeParams : true});


router.post('/api/v0/login', async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/login");
    // req_json = req.body;
    const pseudo_view = await loginController(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.json(pseudo_view);
    }
    else {
        res.status(401).json({error : 'Invalid Login'});
    }
    // const test = {
    //     username: 'BOB',
    //     password: '123'
    // }
    // loginController(test);
});


async function loginController(req) {
    // req_json.username = 'doc_oc'
    // req_json.password = 'MTIz'
    const req_json = req.body;
    console.log(req.json);
    const model_user_login_info = await orm_login.verifyLogin(req_json.username, req_json.password);
    if(model_user_login_info) {
        console.log('User found!');
        console.log(model_user_login_info);
        // set cookie
        session = req.session;
        session.userid = model_user_login_info.username;
        let model = null;
        if(model_user_login_info.user_role.toUpperCase() == 'DOCTOR') {
            model = await orm_emp_info.get_doctor_info(req_json.username);
        }
        else if(model_user_login_info.user_role.toUpperCase() == 'INTERN') {
            model = await orm_emp_info.get_intern_info(req_json.username);
        }
        else if(model_user_login_info.user_role.toUpperCase() == 'RECEPTIONIST') {
            model = await orm_emp_info.get_receptionist_info(req_json.username);
        }

        console.log(model);

        const pseudo_view = {
            username : req_json.username,
            role : model_user_login_info.user_role,
            info : model,
        };
        
        console.log(pseudo_view);

        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}




module.exports = router;