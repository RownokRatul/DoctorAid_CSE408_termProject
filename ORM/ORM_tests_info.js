const { as } = require("pg-promise");
const prisma = require("./ORM_init");


// async function get_queued_tests() {
//     const queued_tests = await prisma.queued_tests.findMany({
//         select: {
//             prescription_id: true,
//             test_id: true,
//         }
//     });
//     console.log(queued_tests);
//     return queued_tests;
// }

async function get_queued_tests() {
    try {
      const queuedTests = await prisma.queued_tests.findMany({
        select: {
          prescription_id: true,
          test_id: true,
          test: {
            select: {
              test_name: true,
            },
          },
          prescription:{
            select:{
                date: true,
            }
          }
        },
      });
  
      return queuedTests;
    // return result;
    } catch (error) {
      console.error("Error fetching queued tests:", error);
      throw error; // You can handle the error as needed
    }
  }
  

async function get_test_metadata(test_id) {
    const test_metadata = await prisma.test_metadata.findUnique({
        where: {
            id: test_id,
        },
        select:{
          id: true,
          test_name: true,
          row_name: true,
          column_name: true,
        }
    });
    console.log(test_metadata);
    return test_metadata;
}
  

// async function update_test_result(presc_id, test_id, result) {
//   const newPrescribedTest = await prisma.prescribed_tests.create({
//       data: {
//           prescription_id: presc_id,
//           test_id : test_id,
//           test_values: result,
//       }
//   });
//   return newPrescribedTest;
// }

async function update_test_result(prescription_id, test_id, test_values, date) {
  
  // const dummy = await prisma.prescribed_tests.delete({
  //   where: { prescription_id_test_id: { prescription_id, test_id } },
  // });
  // console.log(dummy);
  // Check if the entry exists in the queued_tests table
  // await prisma.queued_tests.create({where: { prescription_id_test_id: { prescription_id, test_id } }})
  const queuedTest = await prisma.queued_tests.findUnique({
    where: { prescription_id_test_id: { prescription_id, test_id } },
  });
  try{
    if (!queuedTest) {
      throw new Error('No matching queued test found');
    }

    // Begin a transaction
    const result = await prisma.$transaction([
      // Delete the entry from the queued_tests table
        prisma.queued_tests.delete({
          where: { prescription_id_test_id: { prescription_id, test_id } },
        }),
        // Create a new entry in the prescribed_tests table
        prisma.prescribed_tests.create({
          data: {
            prescription_id,
            test_id,
            test_values,
            date,
          },
        }),
    ]);
        // The result will be an array containing the results of the delete and create operations
      return result[1]; // Return the result of the create operation
  }catch(error){
    console.error("Error updating test result:", error);
    throw error; // You can handle the error as needed
  }
}

async function get_prescribed_tests_by_patient(patient_id) {
  const prescribedTests = await prisma.prescribed_tests.findMany({
    where: {
      prescription: {
        patient_id: patient_id
      }
    },
    select: {
      prescription_id: true,
      test_id: true,
      test: {
        select: {
          test_name: true
        }
      },
      prescription: {
        select: {
          date: true
        }
      }
    }
  });

  return prescribedTests;
  // return prescribedTests.map(test => ({
  //   prescription_id: test.prescription_id,
  //   test_id: test.test_id,
  //   test_name: test.test.test_name,
  //   date: test.prescription.date
  // }));
}

async function get_prescribed_test_by_test_id(prescription_id, test_id) {
  const prescribedTest = await prisma.prescribed_tests.findUnique({
    where: {
      prescription_id_test_id: {
        prescription_id,
        test_id
      }
    },
    select: {
      prescription_id: true,
      test_id: true,
      test_values: true,
      date: true
    }
  });

  return prescribedTest;
}


module.exports = {
    get_queued_tests,
    get_test_metadata,
    update_test_result,
    get_prescribed_tests_by_patient,
    get_prescribed_test_by_test_id,
}
