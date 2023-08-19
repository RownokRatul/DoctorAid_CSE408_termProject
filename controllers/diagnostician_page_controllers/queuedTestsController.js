const orm_queued_tests = require('../../ORM/ORM_tests_info');

async function queuedTestsController(req) {
    const req_json = req.body;
    console.log("queuedTestController");
    const model_queued_tests = await orm_queued_tests.get_queued_tests();
    if(model_queued_tests){
        
        const pseudo_view  = model_queued_tests.map(item => ({
            prescription_id: item.prescription_id,
            test_id: item.test_id,
            test_name: item.test.test_name,
            date: item.prescription.date,
          }));
        console.log(pseudo_view);
        return pseudo_view;
    }
}

module.exports = {queuedTestsController};