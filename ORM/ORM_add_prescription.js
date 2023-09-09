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

async function addDiseasesForPrescription(prescriptionId, diseaseIds) {
  // Prepare the data for bulk insert
  const prescriptionDiseasesData = diseaseIds.map((diseaseId) => ({
    prescription_id: prescriptionId,
    disease_id: diseaseId,
  }));

  // Insert records in a transaction
  return prisma.$transaction(
    prescriptionDiseasesData.map((diseaseData) =>
      prisma.prescription_diseases.create({
        data: diseaseData,
      })
    )
  );
}


async function createNewPrescription(patientId, doctorUsername, date, findings) {
  return await prisma.prescription.create({
    data: {
      patient_id: patientId,
      doctor_username: doctorUsername,
      date: date,
      findings: findings
    },
    select: {
      id: true  // Only selecting 'id' as that's all we need here
    }
  });
}
  


// async function addPrescriptionEntry(testIds, drugIds, prescribedDosages, diseaseIds, patientId, doctorUsername, date, findings) {
//   try {
//     // First, create a new prescription and get its ID
//     const newPrescription = await createNewPrescription(patientId, doctorUsername, date, findings);
//     const prescriptionId = newPrescription.id;

//     // Now, use the newly generated prescriptionId to add tests, drugs, and diseases
//     const newEntry = await prisma.$transaction([
//       queueTestsForPrescription(prescriptionId, testIds),
//       addPrescribedDrugs(prescriptionId, drugIds, prescribedDosages),
//       addDiseasesForPrescription(prescriptionId, diseaseIds),
//     ]);

//     return {
//       newPrescription,
//       newEntry
//     };
//   } catch (error) {
//     console.error("Error adding prescription entry:", error);
//     throw error;
//   }
// }

async function addPrescriptionEntry(testIds, drugIds, prescribedDosages, diseaseIds, patientId, doctorUsername, date, findings) {
  try {
    const temp_model = await createNewPrescription(patientId, doctorUsername, date, findings);
    const prescriptionId = temp_model.id;
    await Promise.all([
      queueTestsForPrescription(prescriptionId, testIds),
      addPrescribedDrugs(prescriptionId, drugIds, prescribedDosages),
      addDiseasesForPrescription(prescriptionId, diseaseIds)
    ]);
    return temp_model;
  } catch (error) {
    console.error("Error adding prescription entry:", error);
    throw error;
  }
}

module.exports = {addPrescriptionEntry};