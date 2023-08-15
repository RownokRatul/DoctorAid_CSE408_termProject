const orm_patient_demography_info = require('../ORM/ORM_patient_info');

async function patientDemographyController(req) {
    const req_json = req.body;
    console.log("In patient Demography Controller");
    console.log(req.body);

    const patientId = req_json.id; // Assuming you have the patient ID available in the request

    const model_patient_demography_info = await orm_patient_demography_info.get_patient_demography_info(patientId);

    if (model_patient_demography_info) {
        console.log("Full object: ", model_patient_demography_info);

        const pseudo_view = {
            patient_demography_info: model_patient_demography_info
        };

        console.log("Pseudo view ", pseudo_view);

        return pseudo_view;
    } else {
        console.log('No user Found!');
        return null;
    }
}

module.exports = { patientDemographyController };
