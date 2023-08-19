// controllers/searchcontroller.js
const orm_search_patient = require('../../ORM/ORM_patient_info');

async function patientSearchController(req) {
    const req_json = req.body;

    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_patient_basic_info = await orm_search_patient.get_patient_basic_info(req_json.phone);
    if(model_patient_basic_info) {
        console.log('In controllers/searchcontroller.js');
        console.log('Patient found!');
        console.log(model_patient_basic_info);
        const pseudo_view = model_patient_basic_info;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {
    patientSearchController
};