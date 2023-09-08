const { as } = require("pg-promise");
const prisma = require("./ORM_init");


async function getPrescribedBrandDrugsByPatient(patientId) {
    const prescribedDrugs = await prisma.prescribed_drugs.findMany({
      where: {
        prescription: {
          patient_id: patientId
        }
      },
      select: {
        prescription_id: true,
        drug_id: true,
        drug: {
          select: {
            name: true,
            generic: {
              select: {
                name: true
              }
            }
          }
        },
        prescription: {
          select: {
            doctor_username: true,
            date: true
          }
        }
      }
    });
  
    return prescribedDrugs;
  }

  async function getPrescribedBrandDrugByDrugId(prescriptionId, drugId) {
    const prescribedDrug = await prisma.prescribed_drugs.findUnique({
      where: {
        prescription_id_drug_id: {
          prescription_id: prescriptionId,
          drug_id: drugId
        }
      },
      select: {
        prescription_id: true,
        drug_id: true,
        prescribed_dosage: true,
        drug: {
          select: {
            name: true,
            generic: {
              select: {
                name: true,
                adverse_effects: true,
                usecases: true
              }
            },
            adult_dosage: true,
            child_dosage: true,
            brand: {
              select: {
                brand_name: true
              }
            }
          }
        },
        prescription: {
          select: {
            doctor_username: true,
            date: true
          }
        }
      }
    });
  
    if (!prescribedDrug) return null;

  // Structuring the data in a more readable format
    const organizedPrescribedDrug = {
        prescriptionId: prescribedDrug.prescription_id,
        drugId: prescribedDrug.drug_id,
        prescribedDosage: prescribedDrug.prescribed_dosage,
        brandName: prescribedDrug.drug.name,
        genericName: prescribedDrug.drug.generic.name,
        prescriptionDate: prescribedDrug.prescription.date,
        doctor_username: prescribedDrug.prescription.doctor_username,
        adultDosage: prescribedDrug.drug.adult_dosage,
        childDosage: prescribedDrug.drug.child_dosage,
        brand: prescribedDrug.drug.brand.brand_name,
        usecases: prescribedDrug.drug.generic.usecases,
        adverseEffects: prescribedDrug.drug.generic.adverse_effects,
    };

    return organizedPrescribedDrug;
  }
  
  
  module.exports = { getPrescribedBrandDrugsByPatient, getPrescribedBrandDrugByDrugId};