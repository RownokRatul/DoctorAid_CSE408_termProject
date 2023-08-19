const prisma = require('./ORM_init');

async function getAllDiseases() {
    const diseases = await prisma.diseases.findMany({
      select: {
        id: true,
        disease_name: true,
      },
    });
  
    console.log(diseases);
    return diseases;
}
  

module.exports = {
    getAllDiseases,
}