const orm_prescription = require('../../ORM/ORM_add_prescription');

async function prescriptionTabController(req) {
    const req_json = req.body;
    console.log("prescriptionTabController");
    console.log(req_json);
    const model_prescriptions = await orm_prescription.getPrescriptionsByPatientId(req_json.patient_id);
    if(model_prescriptions) {
        console.log('Patient Registered!');
        // console.log(model_prescriptions);
        const pseudo_view = model_prescriptions;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {prescriptionTabController};