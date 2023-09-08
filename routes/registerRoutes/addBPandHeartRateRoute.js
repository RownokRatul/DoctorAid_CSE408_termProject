const express = require('express');
// const orm_registerPatient = require('../../ORM/ORM_registerPatient');
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {addBPandHeartRateController} = require('../../controllers/intern_tab_controllers/addBPandHeartRateController'); // Import the addBPandHeartRateController function


const router = express.Router({mergeParams : true});

const ensureAuthenticated = require('../../authentication/ensure-auth');

router.post('/api/v0/add_bp_hr', ensureAuthenticated, async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/search_patient");
    // req_json = req.body;
    const pseudo_view = await addBPandHeartRateController(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;