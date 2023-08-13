const express = require('express');
const orm_search_patient = require('../../ORM/ORM_patient_info');
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();


const router = express.Router({mergeParams : true});


router.post('/api/v0/search_patient', async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/search_patient");
    // req_json = req.body;
    const pseudo_view = await patientSearchController(req);
    if(pseudo_view) {
        // console.log(pseudo_view);
        const user = pseudo_view[0];
        res.status(200).json({message : "okay", user});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

async function patientSearchController(req) {
    const req_json = req.body;

    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }
    console.log(req_json);
    const model_patient_basic_info = await orm_search_patient.get_patient_basic_info(req_json.phone);
    if(model_patient_basic_info) {
        console.log('Patient found!');
        console.log(model_patient_basic_info);
        const pseudo_view = model_patient_basic_info;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}




module.exports = router;