// Controller/getprescribeddrugscontroller.js
const orm_prescribedDrugs = require('../../ORM/ORM_drugs_info');

async function prescribedDrugsByPatientController(req) {
  const req_json = req.body;
  console.log(req_json);
  const patient_id = req_json.patient_id;
  const model_prescribed_drugs = await orm_prescribedDrugs.getPrescribedBrandDrugsByPatient(patient_id);
  if(model_prescribed_drugs) {
    console.log(model_prescribed_drugs)
    const pseudo_view =  model_prescribed_drugs.map(drug => ({
      prescription_id: drug.prescription_id,
      drug_id: drug.drug_id,
      drug_name: drug.drug.name,
      generic_name: drug.drug.generic.name,
      date: drug.prescription.date,
      doctor_username: drug.prescription.doctor_username
    }))
    console.log(pseudo_view);
    return pseudo_view;
  }
  else {
    console.log('No drugs Found!');
    return null;
  }
}

module.exports = {prescribedDrugsByPatientController};
