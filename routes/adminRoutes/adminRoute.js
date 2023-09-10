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


// Router function to add a brand
router.post('/api/v0/admin/create_brand', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addBrandController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Similar pattern follows for all other routes

// Add BrandDrug
router.post('/api/v0/admin/create_brand_drug', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addBrandDrugController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Add GenericDrug
router.post('/api/v0/admin/create_generic_drug', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addGenericDrugController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Add Disease
router.post('/api/v0/admin/create_disease', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addDiseaseController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});


// Add DiseaseTag
router.post('/api/v0/admin/create_disease_tag', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addDiseaseTagController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});


// Router function to delete a brand
router.delete('/api/v0/admin/delete_brand', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteBrandController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Delete BrandDrug
router.delete('/api/v0/admin/delete_brand_drug', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteBrandDrugController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Delete GenericDrug
router.delete('/api/v0/admin/delete_generic_drug', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteGenericDrugController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Delete Disease
router.delete('/api/v0/admin/delete_disease', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteDiseaseController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Delete DiseaseTag
router.delete('/api/v0/admin/delete_disease_tag', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteDiseaseTagController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    } else {
        res.status(404).json({error : 'Not Found'});
    }
});


// Add Test Metadata
router.post('/api/v0/admin/add_test_metadata', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addTestMetadataController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Delete Test Metadata
router.delete('/api/v0/admin/delete_test_metadata', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteTestMetadataController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Add Tag
router.post('/api/v0/admin/add_tag', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addTagController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Delete Tag
router.delete('/api/v0/admin/delete_tag', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteTagController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Add TestTag
router.post('/api/v0/admin/add_test_tag', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.addTestTagController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

// Delete TestTag
router.delete('/api/v0/admin/delete_test_tag', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const pseudo_view = await adminControllers.deleteTestTagController(req);
    if(pseudo_view) {
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});


// Add Drug-Drug Interaction
router.post('/api/v0/admin/add_drug_interaction', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const result = await adminControllers.addDrugDrugInteraction(req);
  if (result) {
    res.status(200).json({ message: 'Success', data: result });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

// Delete Drug-Drug Interaction
router.delete('/api/v0/admin/delete_drug_interaction', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const result = await adminControllers.deleteDrugDrugInteraction(req);
  if (result) {
    res.status(200).json({ message: 'Deleted Successfully', data: result });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});


module.exports = router;