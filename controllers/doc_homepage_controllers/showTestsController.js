const orm_get_tests = require('../../ORM/ORM_tests_info');

async function showTestsController(req) {
    const req_json = req.body;
    console.log("showTestsController");
    const model_done_tests = await orm_get_tests.get_done_tests();
    let pseudo_view = [];
    if(model_done_tests){
        
        pseudo_view  = model_done_tests.filter(item => item.prescription.doctor_username === req_json.doctor_username).map(item => ({
            prescription_id: item.prescription_id,
            test_id: item.test_id,
            test_name: item.test.test_name,
            date: item.prescription.date,
            patient_id: item.prescription.patient_id,
            doctor_username: item.prescription.doctor_username,
            status: 'Completed'
          }));
        // console.log(pseudo_view);
        // return pseudo_view;
    }
    const model_queued_tests = await orm_get_tests.get_queued_tests();
    // console.log("--------------model_queued_tests");
    if (model_queued_tests) {
        const new_pseudo_view = model_queued_tests
          .filter(item => item.prescription.doctor_username === req_json.doctor_username)
          .map(item => ({
            prescription_id: item.prescription_id,
            test_id: item.test_id,
            test_name: item.test.test_name,
            date: item.prescription.date,
            patient_id: item.prescription.patient_id,
            doctor_username: item.prescription.doctor_username,
            status: 'Queued'
          }));
        // console.log(new_pseudo_view);
        // Concatenate new items to existing pseudo_view
        pseudo_view = pseudo_view.concat(new_pseudo_view);
        // console.log(pseudo_view);
        // return pseudo_view;
    }
    return pseudo_view;
}

module.exports = {showTestsController};