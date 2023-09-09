const orm_get_all_tags = require('../../ORM/ORM_get_all_obj');

async function getAllTagsController(req) {
    const req_json = req.body;
    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_tags = await orm_get_all_tags.getAllTags();
    if(model_tags) {
        const pseudo_view = model_tags;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}

module.exports = {
    getAllTagsController,
}