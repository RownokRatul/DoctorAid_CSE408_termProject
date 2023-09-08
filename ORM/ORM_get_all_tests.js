const prisma = require('./ORM_init');

async function getAllTests() {
    const tests = await prisma.test_metadata.findMany({
      select: {
        id: true,
        test_name: true,
      },
    });
  
    console.log(tests);
    return tests;
  }

  
module.exports = {
    getAllTests,
}