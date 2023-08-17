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
async function get_patient_summary_info(uid){
    const patientBloodPressureData = await prisma.patient_basic_info.findUnique({
        where: {
            id: uid,
        }, 
        select: {
            id: true,
            name: true,
            phone: true,
            dob: true,
            gender: true,
            height: true,
            weight: true,
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

async function get_patient_demography_info(patientId) {
    console.log("In patient Demography Controller");
    const model_patient_demography_info = await prisma.patient_basic_info.findMany({
        where: {
            id: patientId,
        }, 
        select: {
            name: true,
            dob: true,
            gender: true,
            addresses: true,
            address_from: true,
            address_to: true,
            hometown: true,
            occupations: true,
            occupation_from: true,
            occupation_to: true,
            travel_history: true,
            travel_from: true,
            travel_to: true,
        }
    });

    // Calculate age based on "dob"
    const currentYear = new Date().getFullYear();
    for (const patient of model_patient_demography_info) {
        const birthYear = patient.dob.getFullYear();
        patient.age = currentYear - birthYear;
        delete patient.dob;
    }

    return model_patient_demography_info;
}

module.exports = {
    get_patient_basic_info,
    get_patient_summary_info,
    get_patient_demography_info,
};






  
  
  
  