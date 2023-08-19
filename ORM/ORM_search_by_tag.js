const prisma = require("./ORM_init");


async function getTestsByPatientAndTags(patientId, tagIds) {
    console.log(patientId, tagIds);
    return await prisma.tests_tag.findMany({
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
            test_name: true,
            prescribed_tests: {
              where: {
                prescription: {
                  patient_id: patientId,
                },
              },
              select: {
                date: true, // prescribed_date from prescribed_tests
                prescription: {
                  select: {
                    date: true, // date from prescription
                  },
                },
              },
            },
          },
        },
      },
    });
}


  

module.exports = {
    getTestsByPatientAndTags,
}