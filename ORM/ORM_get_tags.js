const prisma = require('./ORM_init');

async function getUniqueTagsForDiseases(diseaseIds) {
    // Query to fetch all disease_tag entries where disease_id is in the given array
    const diseaseTags = await prisma.disease_tag.findMany({
      where: {
        disease_id: {
          in: diseaseIds
        }
      },
      select: {
        tag_id: true
      },
      distinct: ['tag_id']
    });
  
    // Extracting unique tag_ids
    const uniqueTagIds = diseaseTags.map(tag => tag.tag_id);
  
    return uniqueTagIds;
  }


  async function getUniqueTagsForDrugs(drugIds) {
    // Query to fetch all drug_tag entries where drug_id is in the given array
    const drugTags = await prisma.drug_tag.findMany({
      where: {
        drug_id: {
          in: drugIds
        }
      },
      select: {
        tag_id: true
      },
      distinct: ['tag_id']
    });
  
    // Extracting unique tag_ids
    const uniqueTagIds = drugTags.map(tag => tag.tag_id);
  
    return uniqueTagIds;
  }


  async function getUniqueTagsForTests(testIds) {
    // Query to fetch all tests_tag entries where test_id is in the given array
    const testTags = await prisma.tests_tag.findMany({
      where: {
        test_id: {
          in: testIds
        }
      },
      select: {
        tag_id: true
      },
      distinct: ['tag_id']
    });
  
    // Extracting unique tag_ids
    const uniqueTagIds = testTags.map(tag => tag.tag_id);
  
    return uniqueTagIds;
  }

  module.exports = {getUniqueTagsForDiseases, getUniqueTagsForDrugs, getUniqueTagsForTests};
