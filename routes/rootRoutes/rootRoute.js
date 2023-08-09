const express = require('express');
const session = require('express-session');

require('dotenv').config();
const router = express.Router({mergeParams : true});

console.log('root route created!')

router.get('/', async (req, res) => {
    console.log("Requested in /");
});

module.exports = router;