const express = require('express');
// const orm_registerPatient = require('../../ORM/ORM_registerPatient');
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {getPracticeController, createPracticeController} = require('../../controllers/practice_controller/practiceController'); // Import the patientRegisterController function


const router = express.Router();

router.get('/api/v0/get_practice', async (req, res) => { //post->get
    {
        console.log("req.body\n");
        const pseudo_view = await getPracticeController(req);
        if(pseudo_view) {
            console.log(pseudo_view);
            res.status(200).json({message : 'Success', data : pseudo_view});
        }
        else {
            console.log('NO user Found!');
            res.status(404).json({error : 'Not Found'});
        }
    }
});

router.post('/api/v0/create_practice', async (req, res) => { //post->get
    {
        console.log("req.body\n");
        const pseudo_view = await createPracticeController(req);
        if(pseudo_view) {
            console.log(pseudo_view);
            res.status(200).json({message : 'Success', data : pseudo_view});
        }
        else {
            console.log('NO user Found!');
            res.status(404).json({error : 'Not Found'});
        }
    }
});

module.exports = router;
