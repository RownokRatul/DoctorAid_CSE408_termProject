const prisma = require('./ORM_init');

async function get_patient_basic_info(phone) {
    const model_patient_basic_info = await prisma.patient_basic_info.findUnique({
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
            travel_history: true,
            travel_from: true,
            travel_to: true,
            height: true,
            weight: true,
        }
    });
    return model_patient_basic_info;
}
  

async function get_chronic_disease_by_pid(pid) {
    const chronicDiseases = await prisma.diseases.findMany({
        where: {
          medical_history: {
            some: {
              patient_id: pid,
              diseases: {
                is_chronic: "Y",
              }
            }
          }
        },
        select: {
          disease_name: true,
        },
      });
      
    //   console.log(chronicDiseases);
    return chronicDiseases;

    //   return chronicDiseases.map(disease => ({
    //     disease_name: disease.disease_name,
    //     date: disease.medical_history.map(mh => mh.date)
    //   }));
  }
  

async function get_patient_summary_info(uid) {
    const generalTabSummary = await prisma.patient_basic_info.findUnique({
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
          where: {
            patient_id: uid,
          },
          select: {
            taken_at: true,
            value_low: true,
            value_high: true,
          },
          orderBy: {
            taken_at: 'asc',
          },
        },
        heartRates: {
          where: {
            patient_id: uid,
          },
          select: {
            taken_at: true,
            value: true,
          },
          orderBy: {
            taken_at: 'asc',
          },
        },
        // medicalHistory: {
        //   where: {
        //     diseases: {
        //       is_chronic: 'Y',
        //     },
        //   },
        //   select: {
        //     disease_id: true,
        //     date: true,
        //     diseases: {
        //       select: {
        //         disease_name: true,
        //       },
        //     },
        //   },
        // },
      },
    });
    return generalTabSummary;
}
  

// async function get_patient_summary_info(uid){
//     const patientBloodPressureData = await prisma.patient_basic_info.findUnique({
//         where: {
//             id: uid,
//         }, 
//         select: {
//             id: true,
//             name: true,
//             phone: true,
//             dob: true,
//             gender: true,
//             height: true,
//             weight: true,
//             bloodPressures: {
//                 select: {
//                     taken_at: true,
//                     value_low: true,
//                     value_high: true
//                 },
//                     orderBy: {
//                     taken_at: 'asc'
//                 }
//             },
//             heartRates: { 
//                 select: {
//                     taken_at: true,
//                     value: true
//                 },
//                 orderBy: {
//                     taken_at: 'asc'
//                 }
//             }
//         }
//     });
//     return patientBloodPressureData;
// }



async function get_patient_demography_info(patientId) {
  
  console.log("***********************-")
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
    console.log("--------------**--------------------")
    console.log(model_patient_demography_info);

    // Calculate age based on "dob"
    const currentYear = new Date().getFullYear();
    for (const patient of model_patient_demography_info) {
        const birthYear = patient.dob.getFullYear();
        patient.age = currentYear - birthYear;
        delete patient.dob;
    }
    console.log("###########################")
    console.log(model_patient_demography_info);

    return model_patient_demography_info;
}

async function get_most_recent_patients(doctorUsername, limit) {
  try {
    const recentPatients = await prisma.prescription.findMany({
      where: {
        doctor_username: doctorUsername,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
      select: {
        patient_id: true,
        patient: {
          select: {
            name: true,
            phone: true, // Assuming the field name is "phoneNumber" in the "patient_basic_info" model
          },
        },
        date: true,
        findings: true,
      },
    });

    return recentPatients.map((entry) => ({
      patient_id: entry.patient_id,
      name: entry.patient.name,
      phoneNumber: entry.patient.phone,
      date: entry.date,
      findings: entry.findings,
    }));
  } catch (error) {
    console.error('Error fetching most recent patients:', error);
    throw error;
  }
}

async function getChronicDiseasesByPId(patient_id) {
  try {
    // Fetch prescriptions based on patient_id
    const prescriptions = await prisma.prescription.findMany({
      where: {
        patient_id: patient_id
      },
      include: {
        prescription_diseases: {
          select: {
            disease: {
              where: {
                is_chronic: "Y"
              },
              select: {
                disease_name: true
              }
            }
          }
        }
      }
    });

    // Extract chronic disease names
    const chronicDiseases = prescriptions.flatMap(prescription => 
      prescription.prescription_diseases.map(pd => pd.disease.disease_name)
    );
    console.log(chronicDiseases);

    return chronicDiseases;
  } catch (error) {
    console.error("Error in getChronicDiseasesByPatientId: ", error);
    return null;
  }
}

module.exports = {
    get_patient_basic_info,
    get_patient_summary_info,
    get_patient_demography_info,
    get_chronic_disease_by_pid,
    get_most_recent_patients,
    getChronicDiseasesByPId,
};






  
  
  
  