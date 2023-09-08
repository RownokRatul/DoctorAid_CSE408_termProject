const express = require('express');
const checkCookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {createPrescribedTestController} = require('../../controllers/diagnostician_page_controllers/createPrescribedTestController'); // Import the testMetadataController function

const router = express.Router();
const ensureAuthenticated = require('../../authentication/ensure-auth');
router.post('/api/v0/create_prescribed_test',ensureAuthenticated, async (req, res) => { 
    // console.log(req.body);
    const pseudo_view = await createPrescribedTestController(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(401).json({error : 'Invalid Login'});
    }
});

module.exports = router;