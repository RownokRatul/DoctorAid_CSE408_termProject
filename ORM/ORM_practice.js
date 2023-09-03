const prisma = require('./ORM_init');

async function createPractice(practiceData){
    try{
        const newPractice = await prisma.practice.create({
            data: {
                name: practiceData.name,
            } 
        });

        return newPractice;
    }catch(error){
        console.error('Error inserting practice information:', error);
        throw error;
    }

}

async function getPractice(){
    try{
        const practice = await prisma.practice.findMany({
            select: {
                id: true,
                name: true,
                relations: {
                    select: {
                    occupation: true,
                    }
                },
            }
        });

        return practice;
    }catch(error){
        console.error('Error getting practice information:', error);
        throw error;
    }
}
// delete function
async function deletePractice(practiceData){
    try{
        const deletePractice = await prisma.practice.delete({
            where: {
                id: practiceData.id,
            } 
        });

        return deletePractice;
    }catch(error){
        console.error('Error deleting practice information:', error);
        throw error;
    }

}
// update function
async function editPractice(practiceData){
    try{
        const editPractice = await prisma.practice.update({
            where: {
                id: practiceData.id,
            },
            data: {
                name: practiceData.name,
            } 
        });

        return editPractice;
    }catch(error){
        console.error('Error updating practice information:', error);
        throw error;
    }

}

module.exports = {
    createPractice,
    getPractice,
    deletePractice,
    editPractice,
};

