const express = require('express');
const checkCookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {getRecentPatientsController} = require('../../controllers/doc_homepage_controllers/getRecentPatientsController'); // Import the loginController function

const router = express.Router();
const ensureAuthenticated = require('../../authentication/ensure-auth');
router.post('/api/v0/get_recent_patients', ensureAuthenticated, async (req, res) => { 
    // console.log(req.body);
    const pseudo_view = await getRecentPatientsController(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(401).json({error : 'Invalid Login'});
    }
});

module.exports = router;