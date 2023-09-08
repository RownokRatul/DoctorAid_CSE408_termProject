const { as } = require("pg-promise");
const prisma = require("./ORM_init");


async function addVitalSigns(patient_id, taken_at, heart_rate_value, bp_value_low, bp_value_high) {
    const createHeartRate = prisma.patient_heart_rates.create({
      data: {
        patient_id: patient_id,
        taken_at: new Date(taken_at),
        value: heart_rate_value
      }
    });
  
    const createBloodPressure = prisma.patient_blood_pressures.create({
      data: {
        patient_id: patient_id,
        taken_at: new Date(taken_at),
        value_low: bp_value_low,
        value_high: bp_value_high
      }
    });
  
    try {
      const [newHeartRate, newBloodPressure] = await prisma.$transaction([createHeartRate, createBloodPressure]);
      return {
        heartRate: newHeartRate,
        bloodPressure: newBloodPressure
      };
    } catch (error) {
      console.error("Transaction failed: ", error);
      throw error;
    }
  }

  module.exports = {addVitalSigns};

// const { as } = require("pg-promise");
// const prisma = require("./ORM_init");

// async function addHeartRateEntry(patient_id, taken_at, value) {
//     try {
//       const newEntry = await prisma.patient_heart_rates.create({
//         data: {
//           patient_id: patient_id,
//           taken_at: new Date(taken_at),
//           value: value,
//         },
//       });
//       return newEntry;
//     } catch (error) {
//       console.error("Error adding heart rate entry:", error);
//       throw error;
//     }
//   }


// async function addBloodPressureEntry(patient_id, taken_at, value_low, value_high) {
//   try {
//     const newEntry = await prisma.patient_blood_pressures.create({
//       data: {
//         patient_id: patient_id,
//         taken_at: new Date(taken_at),
//         value_low: value_low,
//         value_high: value_high,
//       },
//     });
//     return newEntry;
//   } catch (error) {
//     console.error("Error adding blood pressure entry:", error);
//     throw error;
//   }
// }

// model.exports = {addHeartRateEntry, addBloodPressureEntry};