const orm_login = require('../ORM/ORM_login');
const orm_emp_info = require('../ORM/ORM_employee_info');

async function loginController(req) {
    // req_json.username = 'doc_oc'
    // req_json.password = 'MTIz'
    const req_json = req.body;
    console.log("loginController")
    // console.log(req.body, req.query);
    const model_user_login_info = await orm_login.verifyLogin(req_json.username, req_json.password);
    if(model_user_login_info) {
        console.log('User found! in controller');
        console.log(model_user_login_info);
        // set cookie
        session = req.session;
        // session.userid = model_user_login_info.username;
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

module.exports = {loginController};