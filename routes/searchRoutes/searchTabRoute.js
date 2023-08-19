const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const searchByTagController = require('../../controllers/search_tab_controllers/searchcontroller');

require('dotenv').config();

const router = express.Router({mergeParams : true});


router.post('/api/v0/search_by_tag', async (req, res) => { 
    console.log("Inside search by tag route!");
    const pseudo_view = await searchByTagController.searchByTagController(req);
    if(pseudo_view) {
        // console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
        // res.status(200).json({message : "okay", user});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;