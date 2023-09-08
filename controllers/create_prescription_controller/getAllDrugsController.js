const orm_get_all_drugs = require('../../ORM/ORM_get_all_generic_drugs');

async function getAllDrugsController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_drugs = await orm_get_all_drugs.getAllGenericDrugs();
    if(model_drugs) {
        const pseudo_view = model_drugs;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {
    getAllDrugsController,
}