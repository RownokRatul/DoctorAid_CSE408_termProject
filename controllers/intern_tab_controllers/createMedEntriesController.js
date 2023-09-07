const ORM_add_medical_history_entry = require('../../ORM/ORM_add_medical_history_entry');

async function createMedicalHistoryEntries(req) {
    // const req_json = req;
    const req_json = req.body;
    console.log("createMedicalHistoryEntries");
    console.log(req_json);
    let model_medical_history_entry;
    for (let i = 0; i < req_json.length; i++) {
        const element = req_json[i];
        model_medical_history_entry = await ORM_add_medical_history_entry.createMedicalHistoryEntry(element.disease_id, element.patient_id, element.date, element.prescription);
        if(model_medical_history_entry){
            const pseudo_view  = model_medical_history_entry;
            console.log(pseudo_view);
        }
        else 
            return null;
    }
    return model_medical_history_entry;
    // const model_medical_history_entry = await ORM_add_medical_history_entry.createMedicalHistoryEntry();
    // if(model_medical_history_entry){
    //     const pseudo_view  = model_medical_history_entry;
    //     console.log(pseudo_view);
    //     return pseudo_view;
    // }
}

module.exports = {createMedicalHistoryEntries};