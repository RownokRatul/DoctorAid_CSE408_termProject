const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const getAllObjController = require('../../controllers/create_prescription_controller/getAllObjController');
const ensureAuthenticated = require('../../authentication/ensure-auth');

require('dotenv').config();

const router = express.Router({mergeParams : true});


router.get('/api/v0/get_all_brands',ensureAuthenticated, async (req, res) => { 
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllObjController.getAllBrandsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

router.get('/api/v0/get_all_brand_drugs',ensureAuthenticated, async (req, res) => { 
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllObjController.getAllBrandDrugsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});


router.get('/api/v0/get_all_diseases',ensureAuthenticated, async (req, res) => { 
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllObjController.getAllDiseasesController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

router.get('/api/v0/get_all_generic_drugs',ensureAuthenticated, async (req, res) => { 
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllObjController.getAllDrugsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

router.get('/api/v0/get_all_tests',ensureAuthenticated, async (req, res) => { 
    // console.log("Inside search by tag route!");
    const pseudo_view = await getAllObjController.getAllTestsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

router.get('/api/v0/get_all_drug_interactions',ensureAuthenticated, async (req, res) => {
    const pseudo_view = await getAllObjController.getAllDrugInteractionsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;