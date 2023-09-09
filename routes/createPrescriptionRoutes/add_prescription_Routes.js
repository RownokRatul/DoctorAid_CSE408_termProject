const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const addPrescriptionController = require('../../controllers/create_prescription_controller/addPrescriptionController');
const ensureAuthenticated = require('../../authentication/ensure-auth');

require('dotenv').config();

const router = express.Router({mergeParams : true});

router.post('/api/v0/add_prescription',ensureAuthenticated, async (req, res) => {
    const pseudo_view = await addPrescriptionController.addPrescriptionController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;