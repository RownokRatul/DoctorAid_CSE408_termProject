const orm_get_tags = require('../../ORM/ORM_get_tags');


async function getDrugTagsController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_tags = await orm_get_tags.getUniqueTagsForDrugs(req_json.drug_ids);
    if(model_tags) {
        const pseudo_view = model_tags;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

async function getDiseaseTagsController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_tags = await orm_get_tags.getUniqueTagsForDiseases(req_json.disease_ids);
    if(model_tags) {
        const pseudo_view = model_tags;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

async function getTestTagsController(req) {
    const req_json = req.body;

    console.log(req_json);
    const model_tags = await orm_get_tags.getUniqueTagsForTests(req_json.test_ids);
    if(model_tags) {
        const pseudo_view = model_tags;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = { getDrugTagsController, getDiseaseTagsController, getTestTagsController };