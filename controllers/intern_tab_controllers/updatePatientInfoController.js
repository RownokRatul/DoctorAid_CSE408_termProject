// Controller/patientregistercontroller.js
const orm_registerPatient = require('../../ORM/ORM_registerPatient');

async function patientUpdateController(req) {
    // const req_json = req;
    const req_json = req.body;

    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    var model_patient_basic_info = null;
    console.log(req_json);
    try{
        model_patient_basic_info = await orm_registerPatient.updatePatient(req_json);
    }
    catch(error){
        console.log(error);
        model_patient_basic_info = null;
    }
    if(model_patient_basic_info) {
        console.log('Patient Updated!');
        // console.log(model_patient_basic_info);
        const pseudo_view = model_patient_basic_info;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}


module.exports = {patientUpdateController};