const express = require('express');
const cookie = require('../../authentication/cookie_checker');
const adminControllers = require('../../controllers/adminControllers/adminControllers');
const ensureAuthenticated = require('../../authentication/ensure-auth');
const ensureAdmin = require('../../authentication/ensure-auth-admin');

require('dotenv').config();

const router = express.Router({mergeParams : true});

router.get('/api/v0/admin/list_all_users', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.listAllUsers();
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

router.post('/api/v0/admin/create_user', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addUser(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});


router.delete('/api/v0/admin/delete_user', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteUser(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;