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

  
module.exports = {
    getAllTags,
}