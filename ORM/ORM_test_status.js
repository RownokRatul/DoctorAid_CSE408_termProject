const { format } = require('morgan');
const prisma = require('./ORM_init');

async function getTestStatus(practiceData){
    console.log('inside ORM fetch status');
    try{
        const testStatus = await prisma.prescribed_tests.findMany({
            select: {
                prescription_id: true,
                prescription: {
                    select: {
                        patient_id: true,
                    }
                },
                test: {
                    select: {
                        id: true,
                        test_name: true
                    }
                }
            }
        });
        // console.log(testStatus);
        const formattedResult = testStatus.map(item => ({
            test_id: item.test.id,
            test_name: item.test.test_name,
            patient_id: item.prescription.patient_id,
            prescription_id: item.prescription_id,
            status: 'Completed'
        }));

        const queued_tests = await prisma.queued_tests.findMany({
            select: {
                prescription_id: true,
                test_id: true,
            }
        });
        for(let i=0; i<queued_tests.length; i++){
            for(let j=0; j<formattedResult.length; j++){
                if(queued_tests[i].prescription_id === formattedResult[j].prescription_id && queued_tests[i].test_id === formattedResult[j].test_id){
                    formattedResult[j].status = 'Pending';
                }
            }
        }

        return formattedResult;
        
    }catch(error){
        console.error('Error in test status fetching:', error);
        throw error;
    }
}

module.exports = {
    getTestStatus
}
