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
                name: true,
                patient_relations: {
                    occupation: true,
                },
            }
        });

        return practice;
    }catch(error){
        console.error('Error getting practice information:', error);
        throw error;
    }
}