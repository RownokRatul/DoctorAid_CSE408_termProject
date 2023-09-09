const { as } = require("pg-promise");
const prisma = require("./ORM_init");


async function queueTestsForPrescription(prescriptionId, testIds) {
    // Prepare the data for bulk insert
    const queuedTestsData = testIds.map((testId) => ({
      prescription_id: prescriptionId,
      test_id: testId,
    }));
  
    // Insert records in a transaction
    return prisma.$transaction(
      queuedTestsData.map((testData) =>
        prisma.queued_tests.create({
          data: testData,
        })
      )
    );
  }


  // Function to add prescribed drugs for a given prescription
async function addPrescribedDrugs(prescriptionId, drugIds, prescribedDosages) {
    // Validate that drugIds and prescribedDosages have the same length
    if (drugIds.length !== prescribedDosages.length) {
      throw new Error("The lengths of drugIds and prescribedDosages must match");
    }
  
    // Prepare the data for bulk insert
    const prescribedDrugsData = drugIds.map((drugId, index) => ({
      prescription_id: prescriptionId,
      drug_id: drugId,
      prescribed_dosage: prescribedDosages[index], // can be null
    }));
  
    // Insert records in a transaction
    return prisma.$transaction(
      prescribedDrugsData.map((drugData) =>
        prisma.prescribed_drugs.create({
          data: drugData,
        })
      )
    );
  }


async function addPrescriptionEntry(prescription_id, queued_test_ids, drug_ids, prescribed_dosages) {
  try {
    const newEntry =  await prisma.$transaction([
        queueTestsForPrescription(prescriptionId, testIds),
        addPrescribedDrugs(prescriptionId, drugIds, prescribedDosages),
      ]);
    return newEntry;
  } catch (error) {
    console.error("Error adding prescription entry:", error);
    throw error;
  }
}

module.exports = {addPrescriptionEntry};