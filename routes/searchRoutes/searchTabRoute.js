const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const searchByTagController = require('../../controllers/search_tab_controllers/searchcontroller');
const getAllTags = require('../../controllers/search_tab_controllers/getAllTagsController');

require('dotenv').config();

const router = express.Router({mergeParams : true});

const ensureAuthenticated = require('../../authentication/ensure-auth');
router.post('/api/v0/search_by_tag', ensureAuthenticated, async (req, res) => { 
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


router.get('/api/v0/search_by_tag', ensureAuthenticated, async (req, res) => { 
    console.log("Inside search by tag route!");
    const pseudo_view = await getAllTags.getAllTagsController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});



module.exports = router;