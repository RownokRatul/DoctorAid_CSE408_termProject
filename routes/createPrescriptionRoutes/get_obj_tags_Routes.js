const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const getAllDiseasesController = require('../../controllers/create_prescription_controller/getObjTagsController');
const ensureAuthenticated = require('../../authentication/ensure-auth');

require('dotenv').config();

const router = express.Router({mergeParams : true});

router.post('/api/v0/get_drug_tags_by_id',ensureAuthenticated, async (req, res) => {
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllDiseasesController.getDrugTagsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

router.post('/api/v0/get_disease_tags_by_id',ensureAuthenticated, async (req, res) => {
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllDiseasesController.getDiseaseTagsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});


router.post('/api/v0/get_test_tags_by_id',ensureAuthenticated, async (req, res) => {
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllDiseasesController.getTestTagsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;