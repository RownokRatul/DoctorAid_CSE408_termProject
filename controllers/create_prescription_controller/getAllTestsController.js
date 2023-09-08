const orm_get_all_tests = require('../../ORM/ORM_get_all_tests');

async function getAllTestsController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_tests = await orm_get_all_tests.getAllTests();
    if(model_tests) {
        const pseudo_view = model_tests;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {
    getAllTestsController,
}