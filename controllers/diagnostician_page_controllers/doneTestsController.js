const orm_done_tests = require('../../ORM/ORM_tests_info');

async function doneTestsController(req) {
    const req_json = req.body;
    console.log("doneTestController");
    const model_done_tests = await orm_done_tests.get_done_tests();
    if(model_done_tests){
        
        const pseudo_view  = model_done_tests.map(item => ({
            prescription_id: item.prescription_id,
            test_id: item.test_id,
            test_name: item.test.test_name,
            date: item.prescription.date,
            patient_id: item.prescription.patient_id,
            doctor_username: item.prescription.doctor_username,
          }));
        console.log(pseudo_view);
        return pseudo_view;
    }
}

module.exports = {doneTestsController};