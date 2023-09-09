const orm_get_patients = require('../../ORM/ORM_patient_info');

async function getRecentPatientsController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_patients = await orm_get_patients.get_most_recent_patients(req_json.doctor_username, req_json.limit);
    if(model_patients) {
        const pseudo_view = model_patients;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {getRecentPatientsController};