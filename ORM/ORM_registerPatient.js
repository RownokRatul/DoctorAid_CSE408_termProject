const prisma = require('./ORM_init');

async function createPatient(patientData) {
    try {
        const { name, phone, nid, dob, gender, hometown, addresses, address_from, address_to } = patientData;
        // const { name, phone, nid, dob, gender, hometown } = patientData;
        console.log(patientData);
        console.log("addresses:", addresses);
        console.log("address_from:", address_from);
        console.log("address_to:", address_to);
        const id=8;
        const newPatient = await prisma.patient_basic_info.create({
            data: {
                name,
                phone,
                nid,
                dob,
                gender,
                hometown,
                addresses,
                address_from,
                address_to,

            }
        });

        return newPatient;
    } catch (error) {
        // Handle any errors that occur during the insertion
        console.error('Error inserting patient information:', error);
        throw error;
    }
}

module.exports = {
    createPatient,
};
