// Controller/patientregistercontroller.js
const orm_registerPatient = require('../../ORM/ORM_registerPatient');

async function patientRegisterController(req) {
    const req_json = req.body;

    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }

    console.log(req_json);
    const model_patient_basic_info = await orm_registerPatient.createPatient(req_json);
    if(model_patient_basic_info) {
        console.log('Patient Registered!');
        // console.log(model_patient_basic_info);
        const pseudo_view = model_patient_basic_info;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}



module.exports = {patientRegisterController};
