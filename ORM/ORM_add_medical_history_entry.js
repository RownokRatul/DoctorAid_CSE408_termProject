const { as } = require("pg-promise");
const prisma = require("./ORM_init");

async function createMedicalHistoryEntry(diseaseId, patientId, date, prescription) {
    try {
      const newEntry = await prisma.medical_history.create({
        data: {
          disease_id: diseaseId,
          date: new Date(date), // Assumes the date is in a compatible format
          patient_id: patientId,
          prescription: prescription,
        },
      });
      return newEntry;
    } catch (error) {
      console.error('Error creating medical history entry:', error);
      throw error;
    }
  }

  module.exports = {createMedicalHistoryEntry};