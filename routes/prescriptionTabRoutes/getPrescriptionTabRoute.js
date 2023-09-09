const express = require('express');
const { prescriptionTabController } = require('../../controllers/prescription_tab_controllers/prescriptionTabController');
const checkCookie = require('../../authentication/cookie_checker');
require('dotenv').config();

const router = express.Router();
const ensureAuthenticated = require('../../authentication/ensure-auth');
router.post('/api/v0/get_prescriptions_by_patient_id/', ensureAuthenticated, async (req, res) => {
  console.log("Prescription route");
  console.log(req.body);
  const pseudo_view = await prescriptionTabController(req);
  if (pseudo_view) {
    console.log('Prescribed Drugs Route: Drugs found!');
    console.log(pseudo_view);
    res.status(200).json({ message: 'Success', data: pseudo_view });
  } else {
    res.status(401).json({ error: 'No prescriptions found' });
  }
});

module.exports = router;
