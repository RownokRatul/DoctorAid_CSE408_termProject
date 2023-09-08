// DEPRECATED. See newMedicalHistoryEntryRoute and patientBasicInfoUpdateRoute 
const express = require('express');
// const orm_registerPatient = require('../../ORM/ORM_registerPatient');
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {createMedicalHistoryEntries} = require('../../controllers/intern_tab_controllers/createMedEntriesController'); // Import the patientRegisterController function
const {patientUpdateController} = require('../../controllers/intern_tab_controllers/updatePatientInfoController'); // Import the patientRegisterController function


const router = express.Router({mergeParams : true});

const ensureAuthenticated = require('../../authentication/ensure-auth');
router.put('/api/v0/update_new_patient', ensureAuthenticated, async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/search_patient");
    // req_json = req.body;
    console.log(req);
    const pseudo_view = await createMedicalHistoryEntries(req.body.medical_history);
    // if(pseudo_view) {
    //     console.log(pseudo_view);
    //     res.status(200).json({message : 'Success', data : pseudo_view});
    // }
    // else {
    //     res.status(404).json({error : 'Not Found'});
    // }

    const pseudo_view2 = await patientUpdateController(req.body.basic_info);
    if(pseudo_view2 && pseudo_view) {
        console.log(pseudo_view2);
        res.status(200).json({message : 'Success', data : pseudo_view2});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }



});

module.exports = router;