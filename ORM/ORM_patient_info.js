const prisma = require('./ORM_init');

async function get_patient_basic_info(phone) {
    const model_patient_basic_info = await prisma.patient_basic_info.findMany({
        where: {
            phone: phone,
        }, 
        select: {
            id: true,
            name: true,  
            age: true,
            phone: true,  
            address: true, 
            occupation: true,
            nid: true,
            dob: true,
            gender: true
        }
    });
    return model_patient_basic_info;
}

module.exports = {
    get_patient_basic_info,
};