const prisma = require('./ORM_init');

async function get_patient_basic_info(phone) {
    const model_patient_basic_info = await prisma.patient_basic_info.findMany({
        where: {
            phone: phone,
        }, 
        select: {
            id: true,
            name: true,  
            phone: true,  
            nid: true,
            dob: true,
            gender: true,
            addresses: true,
            address_from: true,
            address_to: true,
            occupations: true,
            occupation_from: true,
            occupation_to: true,
            height: true,
            weight: true,
        }
    });
    return model_patient_basic_info;
}
async function get_patient_summary_info(id){
    const patientBloodPressureData = await prisma.patient_basic_info.findMany({
        where: {
            id: id,
        }, 
        select: {
            bloodPressures: {
                select: {
                    taken_at: true,
                    value_low: true,
                    value_high: true
                },
                    orderBy: {
                    taken_at: 'asc'
                }
            },
            heartRates: { 
                select: {
                    taken_at: true,
                    value: true
                },
                orderBy: {
                    taken_at: 'asc'
                }
            }
        }
    });
    return patientBloodPressureData;
}

module.exports = {
    get_patient_basic_info,
    get_patient_summary_info,
};






  
  
  
  