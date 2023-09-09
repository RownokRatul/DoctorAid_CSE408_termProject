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

async function prescriptionByIDController(req) {
    const req_json = req.body;
    // console.log(req_json);
    const prescription_id = req_json.prescription_id;
    // const drug_id = req_json.drug_id;
    const model_prescription = await orm_prescription.getPrescriptionById(prescription_id);
    if(model_prescription) {
      console.log(model_prescription)
      const pseudo_view = model_prescription;
      console.log(pseudo_view);
      return pseudo_view;
    }
    else {
      console.log('No prescription Found!');
      return null;
    }
  }


module.exports = {prescriptionTabController, prescriptionByIDController};