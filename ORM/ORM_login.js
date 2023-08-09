const prisma = require('./ORM_init');

async function verifyLogin(username, password) {
    const model_user_login_info = await prisma.user_login_info.findUnique({
        where: {
            username: username,
            hash_password: password,
        }, 
        select: {
            username: true,
            hash_password: true,
            user_role: true,
        },
    });
    return model_user_login_info;
}

module.exports = {
    verifyLogin,
};