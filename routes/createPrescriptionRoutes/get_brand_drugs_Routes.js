const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const getBrandDrugsController = require('../../controllers/create_prescription_controller/getBrandDrugsController');
const ensureAuthenticated = require('../../authentication/ensure-auth');

require('dotenv').config();

const router = express.Router({mergeParams : true});


router.post('/api/v0/get_brand_drug_by_brand_generic_id',ensureAuthenticated, async (req, res) => { 
    // console.log("Inside search by tag route!");
    const pseudo_view = await getBrandDrugsController.getBrandDrugsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;