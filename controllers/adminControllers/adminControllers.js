const orm_admin = require('../../ORM/ORM_admin');

async function listAllUsers() {
    const allUsers = await orm_admin.getAllUsers();
    if(allUsers) {
        const pseudo_view = allUsers;
        return pseudo_view;
    }
    else {
        console.log('Error fetching all users!');
        return null;
    }
}


async function addUser(req) {
    const req_json = req.body;
    if(req_json.user_role === 'doctor') {
        const model_doctor = await orm_admin.addDoctor(req_json.username, req_json.hash_password, req_json.name, req_json.specialization, req_json.degree, req_json.phone, req_json.email);
        if(model_doctor) {
            const pseudo_view = model_doctor;
            return pseudo_view;
        }
        else {
            console.log('Doctor reg error!');
            return null;
        }
    }
    else if(req_json.user_role === 'receptionist') {
        const model_receptionist = await orm_admin.addReceptionist(req_json.username, req_json.hash_password, req_json.name, req_json.phone);
        if(model_receptionist) {
            const pseudo_view = model_receptionist;
            return pseudo_view;
        }
        else {
            console.log('Receptionist reg error!');
            return null;
        }
    }
    else if(req_json.user_role === 'intern'){
        const model_intern = await orm_admin.addIntern(req_json.username, req_json.hash_password, req_json.name, req_json.phone, req_json.email);
        if(model_intern) {
            const pseudo_view = model_intern;
            return pseudo_view;
        }
        else {
            console.log('Intern reg error!');
            return null;
        }
    }
    else if(req_json.user_role === 'diagnostician'){
        const model_diagnostician = await orm_admin.addDiagnostician(req_json.username, req_json.hash_password, req_json.name, req_json.phone, req_json.email);
        if(model_diagnostician) {
            const pseudo_view = model_diagnostician;
            return pseudo_view;
        }
        else {
            console.log('Diagnostician reg error!');
            return null;
        }
    }
    else {
        console.log('No such role!');
        return null;
    }


}

async function deleteUser(req) {
    const req_json = req.body;
    if(req_json.user_role === 'doctor') {
        const model_doctor = await orm_admin.deleteDoctor(req_json.username);
        if(model_doctor) {
            const pseudo_view = model_doctor;
            return pseudo_view;
        }
        else {
            console.log('Doctor delete error!');
            return null;
        }
    }
    else if(req_json.user_role === 'receptionist') {
        const model_receptionist = await orm_admin.deleteReceptionist(req_json.username);
        if(model_receptionist) {
            const pseudo_view = model_receptionist;
            return pseudo_view;
        }
        else {
            console.log('Receptionist delete error!');
            return null;
        }
    }
    else if(req_json.user_role === 'intern'){
        const model_intern = await orm_admin.deleteIntern(req_json.username);
        if(model_intern) {
            const pseudo_view = model_intern;
            return pseudo_view;
        }
        else {
            console.log('Intern delete error!');
            return null;
        }
    }
    else if(req_json.user_role === 'diagnostician'){
        const model_diagnostician = await orm_admin.deleteDiagnostician(req_json.username);
        if(model_diagnostician) {
            const pseudo_view = model_diagnostician;
            return pseudo_view;
        }
        else {
            console.log('Diagnostician delete error!');
            return null;
        }
    }
    else {
        console.log('No such role!');
        return null;
    }
}

async function addTestMetadataController(req, res) {
    const { test_name, row_name, column_name, prefilled_values } = req.body;
    const result = await orm_admin.addTestMetadata(test_name, row_name, column_name, prefilled_values);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteTestMetadataController(req, res) {
    const { id } = req.body;
    const result = await orm_admin.deleteTestMetadata(id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function addTagController(req, res) {
    const { tag_name } = req.body;
    const result = await orm_admin.addTag(tag_name);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteTagController(req, res) {
    const { id } = req.body;
    const result = await orm_admin.deleteTag(id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function addTestsTagController(req, res) {
    const { test_id, tag_id } = req.body;
    const result = await orm_admin.addTestsTag(test_id, tag_id);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteTestsTagController(req, res) {
    const { test_id, tag_id } = req.body;
    const result = await orm_admin.deleteTestsTag(test_id, tag_id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}


async function addBrandController(req, res) {
    const { brand_name } = req.body;
    const result = await orm_admin.addBrand(brand_name);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteBrandController(req, res) {
    const { id } = req.body;
    const result = await orm_admin.deleteBrand(id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function addBrandDrugController(req, res) {
    const { generic_id, name, adult_dosage, child_dosage, brand_id } = req.body;
    const result = await orm_admin.addBrandDrug(generic_id, name, adult_dosage, child_dosage, brand_id);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteBrandDrugController(req, res) {
    const { id } = req.body;
    const result = await orm_admin.deleteBrandDrug(id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function addGenericDrugController(req, res) {
    const { name, usecases, adverse_effects } = req.body;
    const result = await orm_admin.addGenericDrug(name, usecases, adverse_effects);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteGenericDrugController(req, res) {
    const { id } = req.body;
    const result = await orm_admin.deleteGenericDrug(id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function addDiseaseController(req, res) {
    const { disease_name, is_chronic } = req.body;
    const result = await orm_admin.addDisease(disease_name, is_chronic);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteDiseaseController(req, res) {
    const { id } = req.body;
    const result = await orm_admin.deleteDisease(id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}
async function addDiseaseTagController(req, res) {
    const { disease_id, tag_id } = req.body;
    const result = await orm_admin.addDiseaseTag(disease_id, tag_id);
    
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function deleteDiseaseTagController(req, res) {
    const { disease_id, tag_id } = req.body;
    const result = await orm_admin.deleteDiseaseTag(disease_id, tag_id);
    
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
}

async function addDrugDrugInteraction(req) {
    const { drug1_id, drug2_id, comment } = req.body;
    const result = await orm_admin.addDrugDrugInteraction(drug1_id, drug2_id, comment);
    return result;
  }
  
  async function deleteDrugDrugInteraction(req) {
    const { drug1_id, drug2_id } = req.body;
    const result = await orm_admin.deleteDrugDrugInteraction(drug1_id, drug2_id);
    return result;
  }

module.exports = { listAllUsers, addUser, deleteUser, addTestMetadataController, deleteTestMetadataController,
                     addTagController, deleteTagController, addTestsTagController, deleteTestsTagController, 
                     addBrandController, deleteBrandController, addBrandDrugController, deleteBrandDrugController, 
                     addGenericDrugController, deleteGenericDrugController, addDiseaseController, deleteDiseaseController, 
                     addDiseaseTagController, deleteDiseaseTagController, addDrugDrugInteraction, deleteDrugDrugInteraction };