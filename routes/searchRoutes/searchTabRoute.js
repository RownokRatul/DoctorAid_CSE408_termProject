const express = require('express');
const cookie = require('../../authentication/cookie_checker');

require('dotenv').config();

const router = express.Router({mergeParams : true});


router.post('/api/v0/search', async (req, res) => { 
    const pseudo_view = await patientSearchController(req);
    if(pseudo_view) {
        // console.log(pseudo_view);
        const user = pseudo_view[0];
        res.status(200).json({message : 'Success', data : pseudo_view});
        // res.status(200).json({message : "okay", user});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;