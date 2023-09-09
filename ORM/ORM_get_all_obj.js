const prisma = require('./ORM_init');

async function getAllTags() {
    const tags = await prisma.tags.findMany({
      select: {
        id: true,
        tag_name: true,
      },
    });
  
    console.log(tags);
    return tags;
  }

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

async function getAllGenericDrugs() {
    const drugs = await prisma.generic_drugs.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  
    console.log(drugs);
    return drugs;
}

async function getAllBrands() {
    const branddata = await prisma.brands.findMany({
      select: {
        id: true,
        brand_name: true,
      },
    });
  
    console.log(branddata);
    return branddata;
}
  
module.exports = {
    getAllTags,
    getAllTests,
    getAllDiseases,
    getAllGenericDrugs,
    getAllBrands,
}