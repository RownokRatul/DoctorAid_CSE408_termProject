const express = require('express');
const checkCookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {doneTestsController} = require('../../controllers/diagnostician_page_controllers/doneTestsController'); // Import the loginController function

const router = express.Router();
const ensureAuthenticated = require('../../authentication/ensure-auth');
router.get('/api/v0/get_done_tests', ensureAuthenticated, async (req, res) => { 
    // console.log(req.body);
    const pseudo_view = await doneTestsController(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(401).json({error : 'Invalid Login'});
    }
});

module.exports = router;