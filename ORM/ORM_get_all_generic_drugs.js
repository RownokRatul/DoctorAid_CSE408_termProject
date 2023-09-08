const prisma = require('./ORM_init');

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
    getAllGenericDrugs,
    getAllBrands,
}