const orm_test_status = require('../../ORM/ORM_test_status');


async function getPatientTestStatusController() {
    console.log("Inside test status fetch");
    const pseudo_view = await orm_test_status.getTestStatus();
    console.log(pseudo_view);
    if(pseudo_view) {
        return pseudo_view;
    }
    else {
        console.log('No test status found!');
        return null;
    }
}









async function createPracticeController(req) {
    const req_json = req.body;
    console.log(req_json);
    const model_practice = await orm_practice.createPractice(req_json);
    if(model_practice) {
        const pseudo_view = model_practice;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

// delete controller 
async function deletePracticeController(req) {
    const req_json = req.body;
    console.log(req_json);
    const model_practice = await orm_practice.deletePractice(req_json);
    if(model_practice) {
        const pseudo_view = model_practice;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

//updtae controller
async function editPracticeController(req) {
    const req_json = req.body;
    console.log(req_json);
    const model_practice = await orm_practice.editPractice(req_json);
    if(model_practice) {
        const pseudo_view = model_practice;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {
    getPatientTestStatusController,
    createPracticeController,
    deletePracticeController,
    editPracticeController,
};