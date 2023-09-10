const prisma = require("./ORM_init");


async function getTestsByPatientAndTags(patientId, tagIds) {
    const testsWithTag = await prisma.tests_tag.findMany({
        where: {
          tag_id: {
            in: tagIds,
          },
          test: {
            prescribed_tests: {
              some: {
                prescription: {
                  patient_id: patientId,
                },
              },
            },
          },
        },
        select: {
          test_id: true,
          test: {
            select: {
              prescribed_tests: {
                select: {
                  prescription_id: true,
                },
              },
            },
          },
        },
      });
  
    // Extract unique test_id values
    const uniqueTestIds = [...new Set(testsWithTag.map((item) => item.test_id))];
    // if(!uniqueTestIds) {
    //     return null;
    // }

    // Fetch details for each unique test_id
    const results = await Promise.all(
      uniqueTestIds.map((testId) =>
        prisma.tests_tag.findFirst({
          where: {
            test_id: testId,
            test: {
              prescribed_tests: {
                some: {
                  prescription: {
                    patient_id: patientId,
                  },
                },
              },
            },
          },
          select: {
            test_id: true,
            test: {
              select: {
                test_name: true,
                prescribed_tests: {
                  where: {
                    prescription: {
                      patient_id: patientId,
                    },
                  },
                  select: {
                    date: true,
                    prescription: {
                      select: {
                        date: true,
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
      )
    );
  
    // console.log(results);
    const formattedResult = results.map(item => ({
        test_id: item.test_id,
        test_name: item.test.test_name,
        prescription_date: item.test.prescribed_tests[0]?.prescription?.date, 
        prescribed_date: item.test.prescribed_tests[0]?.date,
        prescription_id: item.test.prescribed_tests[0]?.prescription?.id,
      }));
      
    return formattedResult;
}
  

async function getPrescriptionsByPatientAndTags(patientId, tagIds) {
    const prescriptionsWithTag = await prisma.prescription_tag.findMany({
      where: {
        tag_id: {
          in: tagIds,
        },
        prescription: {
          patient_id: patientId,
        },
      },
      select: {
        prescription: {
          select: {
            id: true, // prescription_id
            date: true,
            doctor_username: true,
          },
        },
      },
    });
  
    // Extract unique prescriptions
    const uniquePrescriptions = Array.from(
      new Set(prescriptionsWithTag.map((item) => item.prescription.id))
    );
    // if(!uniquePrescriptions) {
    //     return null;
    // }
  
    
    const results = await Promise.all(
      uniquePrescriptions.map((prescriptionId) =>
        prisma.prescription.findUnique({
          where: {
            id: prescriptionId,
          },
          select: {
            id: true,
            date: true,
            doctor_username: true,
          },
        })
      )
    );
  
    // console.log(results);
    return results; 
}

async function getDiseasesByPatientAndTags(patientId, tagIds) {
    // Find the diseases related to the specified tags
    const diseasesWithTags = await prisma.disease_tag.findMany({
      where: {
        tag_id: {
          in: tagIds,
        },
      },
      select: {
        disease_id: true,
      },
    });
  
    // Extract unique disease_id values
    const uniqueDiseaseIds = [
      ...new Set(diseasesWithTags.map((item) => item.disease_id)),
    ];
  
    // Fetch the disease names for each unique disease_id, considering the patient's medical history
    const results = await prisma.medical_history.findMany({
      where: {
        patient_id: patientId,
        disease_id: {
          in: uniqueDiseaseIds,
        },
      },
      select: {
        diseases: {
          select: {
            disease_name: true,
          },
        },
        prescription: true,
      },
    });
  
    // Extract and return the disease names
    const diseaseNames = results.map(item => ({
      name: item.diseases.disease_name,
      url: item.prescription,
    }));
  
    
    // console.log(diseaseNames);
    return diseaseNames;
  }
  

// async function getPrescribedDrugsByPatientAndTags(patientId, tagIds) {
//     // Find the prescriptions related to the specified tags
//     const prescriptionsWithTags = await prisma.prescription_tag.findMany({
//         where: {
//             tag_id: {
//                 in: tagIds,
//             },
//             prescription: {
//                 patient_id: patientId,
//             },
//         },
//         select: {
//             prescription_id: true,
//         },
//     });

//     // Extract unique prescription_id values
//     const uniquePrescriptionIds = [
//         ...new Set(prescriptionsWithTags.map((item) => item.prescription_id)),
//     ];

//     // Fetch details for each unique prescription_id
//     const results = await prisma.prescribed_drugs.findMany({
//         where: {
//             prescription_id: {
//                 in: uniquePrescriptionIds,
//             },
//             drug: {
//                 generic_drugs: {
//                     some: {
//                         drug_tag: {
//                             some: {
//                                 tag_id: {
//                                     in: tagIds,
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//         select: {
//             prescription_id: true,
//             drug: {
//                 select: {
//                     generic_drugs: {
//                         select: {
//                             name: true,
//                         },
//                     },
//                 },
//             },
//         },
//     });

//     const formattedResult = results.map((item) => ({
//         prescription_id: item.prescription_id,
//         drug_name: item.drug.generic_drugs[0]?.name,
//     }));

//     console.log(formattedResult);
//     return formattedResult;
// }

  


module.exports = {
    getTestsByPatientAndTags,
    getPrescriptionsByPatientAndTags,
    getDiseasesByPatientAndTags,
    // getPrescribedDrugsByPatientAndTags,
}