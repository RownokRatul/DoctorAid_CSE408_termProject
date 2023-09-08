const express = require('express');
// const orm_search_patient = require('../../ORM/ORM_patient_info');
const { patientSearchController } = require('../../controllers/search_tab_controllers/searchcontroller'); // Import the patientSearchController function
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();


const router = express.Router({mergeParams : true});

const ensureAuthenticated = require('../../authentication/ensure-auth');

router.post('/api/v0/search_patient', ensureAuthenticated, async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/search_patient");
    // req_json = req.body;
    const pseudo_view = await patientSearchController(req);
    if(pseudo_view) {
        // console.log(pseudo_view);
        const user = pseudo_view[0];
        res.status(200).json({message : 'Success', data : pseudo_view});
        // res.status(200).json({message : "okay", user});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;