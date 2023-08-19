// Controller/patientregistercontroller.js
const orm_prescribedTests = require('../ORM/ORM_tests_info');

async function prescribedTestByTestIDController(req) {
    const req_json = req.body;

    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }

    console.log(req_json);
    const prescription_id = req_json.prescription_id;
    const test_id = req_json.test_id;
    const model_prescribed_test = await orm_prescribedTests.get_prescribed_test_by_test_id(prescription_id, test_id);
    if(model_prescribed_test) {
        console.log(model_prescribed_test)
        const pseudo_view =  model_prescribed_test;
        console.log(pseudo_view);
        // console.log(model_patient_basic_info);
        return pseudo_view;
    }
    else {
        console.log('NO tests Found!');
        return null;
    }
}



module.exports = {prescribedTestByTestIDController};