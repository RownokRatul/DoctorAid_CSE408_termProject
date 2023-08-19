const orm_queued_tests = require('../../ORM/ORM_tests_info');

async function testMetadataController(req) {
    const req_json = req.body;
    console.log("getTestMetadataController");
    const model_queued_tests = await orm_queued_tests.get_test_metadata(req_json.test_id);
    if(model_queued_tests){
        const pseudo_view  = model_queued_tests;
        console.log(pseudo_view);
        return pseudo_view;
    }
}

module.exports = {testMetadataController};