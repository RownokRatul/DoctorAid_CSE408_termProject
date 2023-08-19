const orm_prescribed_tests = require('../../ORM/ORM_tests_info');

async function createPrescribedTestController(req) {
    const req_json = req.body;
    console.log("createPrescribedTestController");
    const model_prescribed_test = await orm_prescribed_tests.update_test_result(req_json.prescription_id, req_json.test_id, req_json.test_values, req_json.date);
    if(model_prescribed_test){
        const pseudo_view  = model_prescribed_test;
        console.log(pseudo_view);
        return pseudo_view;
    }
}

module.exports = {createPrescribedTestController};