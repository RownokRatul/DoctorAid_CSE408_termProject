const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const getAllDrugsController = require('../../controllers/create_prescription_controller/getAllDrugsController');
const ensureAuthenticated = require('../../authentication/ensure-auth');

require('dotenv').config();

const router = express.Router({mergeParams : true});


router.get('/api/v0/get_all_generic_drugs',ensureAuthenticated, async (req, res) => { 
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllDrugsController.getAllDrugsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;