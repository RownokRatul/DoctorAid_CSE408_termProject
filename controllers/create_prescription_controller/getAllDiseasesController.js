const orm_get_all_diseases = require('../../ORM/ORM_get_all_diseases');

async function getAllDiseasesController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_diseases = await orm_get_all_diseases.getAllDiseases();
    if(model_diseases) {
        const pseudo_view = model_diseases;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {
    getAllDiseasesController,
}