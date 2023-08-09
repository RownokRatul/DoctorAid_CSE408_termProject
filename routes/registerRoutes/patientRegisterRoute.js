const express = require('express');
const orm_registerPatient = require('../../ORM/ORM_registerPatient');
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();


const router = express.Router({mergeParams : true});


router.post('/api/v0/register_patient', async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/search_patient");
    // req_json = req.body;
    const pseudo_view = await patientRegisterController(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.status(200).json({message : 'Successfully registered'});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

async function patientRegisterController(req) {
    const req_json = req.body;

    // if(!cookie.checkCookie(req.session)) {
    //     // Force to login. And return a status
    //     return;
    // }

    console.log(req_json);
    const model_patient_basic_info = await orm_registerPatient.insertPatientInfo(req_json);
    if(model_patient_basic_info) {
        console.log('Patient Registered!');
        // console.log(model_patient_basic_info);
        const pseudo_view = model_patient_basic_info;
        return pseudo_view;
    }
    else {
        console.log('NO user Found!');
        return null;
    }
}


module.exports = router;