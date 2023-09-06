const orm_queued_tests = require('../../ORM/ORM_tests_info');

async function doneTestsController(req) {
    const req_json = req.body;
    console.log("queuedTestController");
    const model_queued_tests = await orm_queued_tests.get_done_tests();
    if(model_queued_tests){
        
        const pseudo_view  = model_queued_tests.map(item => ({
            prescription_id: item.prescription_id,
            test_id: item.test_id,
            test_name: item.test.test_name,
            date: item.prescription.date,
            patient_id: item.prescription.patient_id,
          }));
        console.log(pseudo_view);
        return pseudo_view;
    }
}

module.exports = {doneTestsController};