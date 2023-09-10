const orm_get_all_obj = require('../../ORM/ORM_get_all_obj');

async function getAllTestsController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_tests = await orm_get_all_obj.getAllTests();
    if(model_tests) {
        const pseudo_view = model_tests;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

async function getAllDrugsController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_drugs = await orm_get_all_obj.getAllGenericDrugs();
    if(model_drugs) {
        const pseudo_view = model_drugs;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

async function getAllDiseasesController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_diseases = await orm_get_all_obj.getAllDiseases();
    if(model_diseases) {
        const pseudo_view = model_diseases;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

async function getAllBrandsController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_drugs = await orm_get_all_obj.getAllBrands();
    if(model_drugs) {
        const pseudo_view = model_drugs;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

async function getAllBrandDrugsController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_drugs = await orm_get_all_obj.getAllBrandDrugs();
    if(model_drugs) {
        const pseudo_view = model_drugs;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

async function getAllDrugInteractionsController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_interactions = await orm_get_all_obj.getAllDrugInteractions();
    if(model_interactions) {
        const pseudo_view = model_interactions;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
  }
  

module.exports = {
    getAllTestsController,
    getAllDrugsController,
    getAllDiseasesController,
    getAllBrandsController,
    getAllDrugInteractionsController,
    getAllBrandDrugsController,
}