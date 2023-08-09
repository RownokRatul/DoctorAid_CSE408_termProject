const prisma = require('./ORM_init');

async function get_doctor_info(username) {
    const model_doctor_info = await prisma.doctor_info.findUnique({
        where: {
            username: username,
        }, 
        select: {
            username: true,
            name: true,  
            specialization: true,
            degree: true,  
            phone: true, 
            email: true,
        }
    });
    return model_doctor_info;
}

async function get_receptionist_info(username) {
    const model_receptionist_info = await prisma.receptionist_info.findUnique({
        where: {
            username: username,
        }, 
        select: {
            username: true,
            name: true,    
            phone: true, 
        }
    });
    return model_receptionist_info;
}

async function get_intern_info(username) {
    const model_intern_info = await prisma.intern_info.findUnique({
        where: {
            username: username,
        }, 
        select: {
            username: true,
            name: true,    
            phone: true, 
        }
    });
    return model_intern_info;
}

module.exports = {
    get_doctor_info, 
    get_intern_info,
    get_receptionist_info,
};