const orm_add_prescription = require('../../ORM/ORM_add_prescription');

async function addPrescriptionController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_prescription = await orm_add_prescription.addPrescriptionEntry(req_json.test_ids, req_json.drug_ids, req_json.prescribed_dosages, req_json.disease_ids, req_json.patient_id, req_json.doctor_username, req_json.date, req_json.findings);
    if(model_prescription) {
        const pseudo_view = model_prescription;
        return pseudo_view;
    }
    else {
        console.log('Here!');
        return null;
    }
}

module.exports = {addPrescriptionController};