const orm_practice = require('../../ORM/ORM_practice');


async function getPracticeController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_practice = await orm_practice.getPractice();
    if(model_practice) {
        const pseudo_view = model_practice;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
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
    getPracticeController,
    createPracticeController,
    deletePracticeController,
    editPracticeController,
};