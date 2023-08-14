const express = require('express');
// const orm_registerPatient = require('../../ORM/ORM_registerPatient');
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {patientRegisterController} = require('../../controllers/registercontroller'); // Import the patientRegisterController function


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




module.exports = router;