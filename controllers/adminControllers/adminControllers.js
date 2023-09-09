const orm_admin = require('../../ORM/ORM_admin');

async function listAllUsers() {
    const allUsers = await orm_admin.getAllUsers();
    if(allUsers) {
        const pseudo_view = allUsers;
        return pseudo_view;
    }
    else {
        console.log('Error fetching all users!');
        return null;
    }
}


async function addUser(req) {
    const req_json = req.body;
    if(req_json.user_role === 'doctor') {
        const model_doctor = await orm_admin.addDoctor(req_json.username, req_json.hash_password, req_json.name, req_json.specialization, req_json.degree, req_json.phone, req_json.email);
        if(model_doctor) {
            const pseudo_view = model_doctor;
            return pseudo_view;
        }
        else {
            console.log('Doctor reg error!');
            return null;
        }
    }
    else if(req_json.user_role === 'receptionist') {
        const model_receptionist = await orm_admin.addReceptionist(req_json.username, req_json.hash_password, req_json.name, req_json.phone);
        if(model_receptionist) {
            const pseudo_view = model_receptionist;
            return pseudo_view;
        }
        else {
            console.log('Receptionist reg error!');
            return null;
        }
    }
    else if(req_json.user_role === 'intern'){
        const model_intern = await orm_admin.addIntern(req_json.username, req_json.hash_password, req_json.name, req_json.phone, req_json.email);
        if(model_intern) {
            const pseudo_view = model_intern;
            return pseudo_view;
        }
        else {
            console.log('Intern reg error!');
            return null;
        }
    }
    else if(req_json.user_role === 'diagnostician'){
        const model_diagnostician = await orm_admin.addDiagnostician(req_json.username, req_json.hash_password, req_json.name, req_json.phone, req_json.email);
        if(model_diagnostician) {
            const pseudo_view = model_diagnostician;
            return pseudo_view;
        }
        else {
            console.log('Diagnostician reg error!');
            return null;
        }
    }
    else {
        console.log('No such role!');
        return null;
    }


}

async function deleteUser(req) {
    const req_json = req.body;
    if(req_json.user_role === 'doctor') {
        const model_doctor = await orm_admin.deleteDoctor(req_json.username);
        if(model_doctor) {
            const pseudo_view = model_doctor;
            return pseudo_view;
        }
        else {
            console.log('Doctor delete error!');
            return null;
        }
    }
    else if(req_json.user_role === 'receptionist') {
        const model_receptionist = await orm_admin.deleteReceptionist(req_json.username);
        if(model_receptionist) {
            const pseudo_view = model_receptionist;
            return pseudo_view;
        }
        else {
            console.log('Receptionist delete error!');
            return null;
        }
    }
    else if(req_json.user_role === 'intern'){
        const model_intern = await orm_admin.deleteIntern(req_json.username);
        if(model_intern) {
            const pseudo_view = model_intern;
            return pseudo_view;
        }
        else {
            console.log('Intern delete error!');
            return null;
        }
    }
    else if(req_json.user_role === 'diagnostician'){
        const model_diagnostician = await orm_admin.deleteDiagnostician(req_json.username);
        if(model_diagnostician) {
            const pseudo_view = model_diagnostician;
            return pseudo_view;
        }
        else {
            console.log('Diagnostician delete error!');
            return null;
        }
    }
    else {
        console.log('No such role!');
        return null;
    }
}

module.exports = { listAllUsers, addUser, deleteUser };