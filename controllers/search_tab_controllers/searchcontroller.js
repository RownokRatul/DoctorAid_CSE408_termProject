// controllers/searchcontroller.js
const orm_search_patient = require('../../ORM/ORM_patient_info');
const orm_search_by_tag = require('../../ORM/ORM_search_by_tag')

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


async function searchByTagController(req) {
    const req_json = req.body;
    console.log(req_json);
    const model_tests = await orm_search_by_tag.getTestsByPatientAndTags(req_json.patient_id, req_json.tags);
    const model_prescriptions = await orm_search_by_tag.getPrescriptionsByPatientAndTags(req_json.patient_id, req_json.tags);
    const model_medical_history = await orm_search_by_tag.getDiseasesByPatientAndTags(req_json.patient_id, req_json.tags);
    if(model_tests || model_prescriptions || model_medical_history) {
        console.log('In controllers/searchTabController');
        // console.log(model_tests);
        // console.log(model_prescriptions);
        // console.log(model_medical_history);
        const search_res = {
            tests: model_tests,
            prescriptions: model_prescriptions,
            medical_history: model_medical_history
        }
        return search_res;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {
    patientSearchController,
    searchByTagController,
};