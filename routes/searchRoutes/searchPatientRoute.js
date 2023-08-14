const express = require('express');
// const orm_search_patient = require('../../ORM/ORM_patient_info');
const { patientSearchController } = require('../../controllers/searchcontroller'); // Import the patientSearchController function
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

module.exports = router;