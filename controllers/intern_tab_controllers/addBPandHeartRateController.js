const orm_add_new_BP_and_heart_rate = require('../../ORM/ORM_add_BP_heart_rate');

async function addBPandHeartRateController(req) {
    // const req_json = req;
    const req_json = req.body;
    console.log("addBPandHeartRate");
    console.log(req_json);
    
    let model_bp_hr = orm_add_new_BP_and_heart_rate.addVitalSigns(req_json.patient_id, req_json.taken_at, req_json.hr_value, req_json.bp_value_low, req_json.bp_value_high);
    if( model_bp_hr) {
        console.log('BP and HR Added!');
        // console.log(model_patient_basic_info);
        const pseudo_view = model_bp_hr;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {addBPandHeartRateController};