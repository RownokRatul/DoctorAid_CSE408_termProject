
async function checkCookie(session) {
    if(!session.userid) {
        console.log('No Cookie has been set');
        return false;
    }
    console.log('Cookie Found!');
    return true;
}

module.exports = checkCookie;