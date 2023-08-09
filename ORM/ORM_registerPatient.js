const prisma = require('./ORM_init');

async function insertPatientInfo(patientData) {
    try {
        const { name, age, phone, address, occupation, nid, dob, gender } = patientData;
  
        const newPatient = await prisma.patient_basic_info.create({
            data: {
            name,
            age,
            phone,
            address,
            occupation,
            nid,
            dob,
            gender,
            },
        });

        return newPatient;
    } catch (error) {
        // Handle any errors that occur during the insertion
        console.error('Error inserting patient information:', error);
        throw error;
    }
}

module.exports = {
    insertPatientInfo,
};