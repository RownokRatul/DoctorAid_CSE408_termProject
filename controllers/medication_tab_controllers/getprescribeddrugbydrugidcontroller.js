// Controller/getprescribeddrugbydrugidcontroller.js
const orm_prescribedDrugs = require('../../ORM/ORM_drugs_info');

async function prescribedDrugByDrugIDController(req) {
  const req_json = req.body;
  console.log(req_json);
  const prescription_id = req_json.prescription_id;
  const drug_id = req_json.drug_id;
  const model_prescribed_drug = await orm_prescribedDrugs.getPrescribedBrandDrugByDrugId(prescription_id, drug_id);
  if(model_prescribed_drug) {
    console.log(model_prescribed_drug)
    const pseudo_view = model_prescribed_drug;
    console.log(pseudo_view);
    return pseudo_view;
  }
  else {
    console.log('No drugs Found!');
    return null;
  }
}

module.exports = {prescribedDrugByDrugIDController};
