const orm_get_brand_drug = require('../../ORM/ORM_drugs_info');

async function getBrandDrugsController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_drugs = await orm_get_brand_drug.getAllBrandDrugsByBrandAndGenericId(req_json.brand_id, req_json.generic_drug_id);
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
    getBrandDrugsController,
}