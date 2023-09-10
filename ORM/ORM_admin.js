const prisma = require("./ORM_init");

async function getAllUsers() {
  try {
    const allUsers = await prisma.user_login_info.findMany({
      select: {
        username: true,
        user_role: true
      },
    });
    return allUsers;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

async function addDoctor(username, hashedPassword, name, specialization, degree, phone, email) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'doctor',
      },
    });

    // Create new doctor info
    const newDoctor = await prisma.doctor_info.create({
      data: {
        username,
        name,
        specialization,
        degree,
        phone,
        email,
      },
    });

    return newDoctor;
  } catch (error) {
    console.error("Error adding new doctor:", error);
    throw error;
  }
}

async function addReceptionist(username, hashedPassword, name, phone) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'receptionist',
      },
    });

    // Create new receptionist info
    const newReceptionist = await prisma.receptionist_info.create({
      data: {
        username,
        name,
        phone,
      },
    });

    return newReceptionist;
  } catch (error) {
    console.error("Error adding new receptionist:", error);
    throw error;
  }
}

async function addIntern(username, hashedPassword, name, phone, email) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'intern',
      },
    });

    // Create new intern info
    const newIntern = await prisma.intern_info.create({
      data: {
        username,
        name,
        phone,
        email,
      },
    });

    return newIntern;
  } catch (error) {
    console.error("Error adding new intern:", error);
    throw error;
  }
}

async function addDiagnostician(username, hashedPassword, name, phone, email) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'diagnostician',
      },
    });

    // Create new diagnostician info
    const newDiagnostician = await prisma.diagnostician_info.create({
      data: {
        username,
        name,
        phone,
        email,
      },
    });

    return newDiagnostician;
  } catch (error) {
    console.error("Error adding new diagnostician:", error);
    throw error;
  }
}

async function deleteDoctor(username) {
  try {
    // Delete doctor info
    const deletedDoctor = await prisma.doctor_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedDoctor;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
}

async function deleteReceptionist(username) {
  try {
    // Delete receptionist info
    const deletedReceptionist = await prisma.receptionist_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedReceptionist;
  } catch (error) {
    console.error("Error deleting receptionist:", error);
    throw error;
  }
}

async function deleteIntern(username) {
  try {
    // Delete intern info
    const deletedIntern = await prisma.intern_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedIntern;
  } catch (error) {
    console.error("Error deleting intern:", error);
    throw error;
  }
}

async function deleteDiagnostician(username) {
  try {
    // Delete diagnostician info
    const deletedDiagnostician = await prisma.diagnostician_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedDiagnostician;
  } catch (error) {
    console.error("Error deleting diagnostician:", error);
    throw error;
  }
}



// Tags

async function addTag(tag_name) {
  try {
    const newTag = await prisma.tags.create({
      data: {
        tag_name
      }
    });
    return { success: true, data: newTag };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


async function deleteTag(id) {
  try {
    const deletedTag = await prisma.tags.delete({
      where: {
        id
      }
    });
    return { success: true, data: deletedTag };
  } catch (error) {
    return { success: false, error: error.message };
  }
}



//Test_metadata

async function addTestMetadata(test_name, row_name, column_name, prefilled_values) {
  try {
    const newTest = await prisma.test_metadata.create({
      data: {
        test_name,
        row_name,
        column_name,
        prefilled_values
      }
    });
    return { success: true, data: newTest };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteTestMetadata(id) {
  try {
    const deletedTest = await prisma.test_metadata.delete({
      where: {
        id
      }
    });
    return { success: true, data: deletedTest };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


//test_tags
async function addTestsTag(test_id, tag_id) {
  try {
    const newTestsTag = await prisma.tests_tag.create({
      data: {
        test_id,
        tag_id
      }
    });
    return { success: true, data: newTestsTag };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteTestsTag(test_id, tag_id) {
  try {
    const deletedTestsTag = await prisma.tests_tag.delete({
      where: {
        test_id_tag_id: {
          test_id,
          tag_id
        }
      }
    });
    return { success: true, data: deletedTestsTag };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


async function addDisease(name, isChronic) {
  try {
    const disease = await prisma.diseases.create({
      data: {
        disease_name: name,
        is_chronic: isChronic
      }
    });
    return { success: true, data: disease };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteDisease(id) {
  try {
    const deletedDisease = await prisma.diseases.delete({
      where: {
        id: id
      }
    });
    return { success: true, data: deletedDisease };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function addDiseaseTag(diseaseId, tagId) {
  try {
    const tag = await prisma.disease_tag.create({
      data: {
        disease_id: diseaseId,
        tag_id: tagId
      }
    });
    return { success: true, data: tag };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
async function deleteDiseaseTag(diseaseId, tagId) {
  try {
    const deletedTag = await prisma.disease_tag.delete({
      where: {
        disease_id_tag_id: {
          disease_id: diseaseId,
          tag_id: tagId
        }
      }
    });
    return { success: true, data: deletedTag };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function addBrand(brandName) {
  try {
    const brand = await prisma.brands.create({
      data: {
        brand_name: brandName
      }
    });
    return { success: true, data: brand };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteBrand(id) {
  try {
    const deletedBrand = await prisma.brands.delete({
      where: {
        id: id
      }
    });
    return { success: true, data: deletedBrand };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function addGenericDrug(name, usecases, adverseEffects) {
  try {
    const genericDrug = await prisma.generic_drugs.create({
      data: {
        name: name,
        usecases: {
          set: usecases
        },
        adverse_effects: {
          set: adverseEffects
        }
      }
    });
    return { success: true, data: genericDrug };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteGenericDrug(id) {
  try {
    const deletedGenericDrug = await prisma.generic_drugs.delete({
      where: {
        id: id
      }
    });
    return { success: true, data: deletedGenericDrug };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function addBrandDrug(genericId, name, adultDosage, childDosage, brandId) {
  try {
    const brandDrug = await prisma.brand_drugs.create({
      data: {
        generic_id: genericId,
        name: name,
        adult_dosage: adultDosage,
        child_dosage: childDosage,
        brand_id: brandId
      }
    });
    return { success: true, data: brandDrug };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteBrandDrug(id) {
  try {
    const deletedBrandDrug = await prisma.brand_drugs.delete({
      where: {
        id: id
      }
    });
    return { success: true, data: deletedBrandDrug };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


// Add Drug-Drug Interaction
async function addDrugDrugInteraction(drug1_id, drug2_id, comment) {
  try {
    const newInteraction = await prisma.drug_drug_interactions.create({
      data: {
        drug1_id,
        drug2_id,
        comment,
      },
    });
    return newInteraction;
  } catch (error) {
    console.error('Error adding drug-drug interaction:', error);
    return null;
  }
}

// Delete Drug-Drug Interaction
async function deleteDrugDrugInteraction(drug1_id, drug2_id) {
  try {
    const deletedInteraction = await prisma.drug_drug_interactions.delete({
      where: {
        drug1_id_drug2_id: {
          drug1_id,
          drug2_id,
        },
      },
    });
    return deletedInteraction;
  } catch (error) {
    console.error('Error deleting drug-drug interaction:', error);
    return null;
  }
}





module.exports = {getAllUsers, addDoctor, addReceptionist, addIntern, addDiagnostician, 
  deleteDoctor, deleteReceptionist, deleteIntern, deleteDiagnostician,
  addTag, deleteTag, addTestMetadata, deleteTestMetadata, addTestsTag, 
  deleteTestsTag, addDisease, deleteDisease, addDiseaseTag, deleteDiseaseTag, 
  addBrand, deleteBrand, addGenericDrug, deleteGenericDrug, addBrandDrug, deleteBrandDrug,
  addDrugDrugInteraction, deleteDrugDrugInteraction};
