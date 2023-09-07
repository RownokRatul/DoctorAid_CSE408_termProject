// Controller/patientregistercontroller.js
const orm_prescribedTests = require('../../ORM/ORM_tests_info');

async function prescribedTestsByPatientController(req) {
    const req_json = req.body;

    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }

    console.log(req_json);
    const patient_id = req_json.patient_id;
    const model_prescribed_tests = await orm_prescribedTests.get_prescribed_tests_by_patient(patient_id);
    if(model_prescribed_tests) {
        console.log(model_prescribed_tests)
        const pseudo_view =  model_prescribed_tests.map(test => ({
            prescription_id: test.prescription_id,
            test_id: test.test_id,
            test_name: test.test.test_name,
            date: test.prescription.date,
            doctor_username: test.prescription.doctor_username
          }))
        console.log(pseudo_view);
        // console.log(model_patient_basic_info);
        return pseudo_view;
    }
    else {
        console.log('NO tests Found!');
        return null;
    }
}



module.exports = {prescribedTestsByPatientController};