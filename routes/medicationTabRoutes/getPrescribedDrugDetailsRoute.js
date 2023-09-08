const express = require('express');
const { prescribedDrugByDrugIDController } = require('../../controllers/medication_tab_controllers/getprescribeddrugbydrugidcontroller');
const checkCookie = require('../../authentication/cookie_checker');
require('dotenv').config();

const router = express.Router();
const ensureAuthenticated = require('../../authentication/ensure-auth');
router.post('/api/v0/get_prescribed_drug_by_drug_id',ensureAuthenticated, async (req, res) => {
  console.log("Prescribed drug details route");
  console.log(req.body);
  const pseudo_view = await prescribedDrugByDrugIDController(req);
  if (pseudo_view) {
    console.log('Prescribed Drug Route: Drug found!');
    console.log(pseudo_view);
    res.status(200).json({ message: 'Success', data: pseudo_view });
  } else {
    res.status(401).json({ error: 'No drugs found' });
  }
});

module.exports = router;
