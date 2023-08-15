const orm_patient_summary_info = require('../ORM/ORM_patient_info');
// const orm_emp_info = require('../ORM/ORM_employee_info');

async function patientSummaryController(req) {
    // req_json.username = 'doc_oc'
    // req_json.password = 'MTIz'
    const req_json = req.body;
    console.log("in patient Summary Controller")
    console.log(req.body);
    const model_patient_summary_info = await orm_patient_summary_info.get_patient_summary_info(req.id);
    console.log(model_patient_summary_info);
    if(model_patient_summary_info) {
        console.log("full object: ", model_patient_summary_info);

        const bloodPressureData = {
            value_highs: [],
            value_lows: [],
            taken_ats: []
        };

        const heartRateData = {
            heart_rates: [],
            taken_ats: []
        };

        model_patient_summary_info.forEach(patientInfo => {
            patientInfo.bloodPressures.forEach(bp => {
                bloodPressureData.value_highs.push(bp.value_high);
                bloodPressureData.value_lows.push(bp.value_low);
                bloodPressureData.taken_ats.push(bp.taken_at);
            });

            patientInfo.heartRates.forEach(hr => {
                heartRateData.heart_rates.push(hr.value);
                heartRateData.taken_ats.push(hr.taken_at);
            });
        });

        const pseudo_view = {
            blood_pressure_data: bloodPressureData,
            heart_rate_data: heartRateData
        };

        console.log("pseudo view ",pseudo_view);

        return pseudo_view;
    }
    else {
        console.log('No user Found!');
        return null;
    }
}

module.exports = {patientSummaryController};