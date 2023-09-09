const prisma = require("./ORM_init");

async function getAllUsers() {
  try {
    const allUsers = await prisma.user_login_info.findMany({
      select: {
        username: true,
        user_role: true
      },
    });
    return allUsers;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

async function addDoctor(username, hashedPassword, name, specialization, degree, phone, email) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'doctor',
      },
    });

    // Create new doctor info
    const newDoctor = await prisma.doctor_info.create({
      data: {
        username,
        name,
        specialization,
        degree,
        phone,
        email,
      },
    });

    return newDoctor;
  } catch (error) {
    console.error("Error adding new doctor:", error);
    throw error;
  }
}

async function addReceptionist(username, hashedPassword, name, phone) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'receptionist',
      },
    });

    // Create new receptionist info
    const newReceptionist = await prisma.receptionist_info.create({
      data: {
        username,
        name,
        phone,
      },
    });

    return newReceptionist;
  } catch (error) {
    console.error("Error adding new receptionist:", error);
    throw error;
  }
}

async function addIntern(username, hashedPassword, name, phone, email) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'intern',
      },
    });

    // Create new intern info
    const newIntern = await prisma.intern_info.create({
      data: {
        username,
        name,
        phone,
        email,
      },
    });

    return newIntern;
  } catch (error) {
    console.error("Error adding new intern:", error);
    throw error;
  }
}

async function addDiagnostician(username, hashedPassword, name, phone, email) {
  try {
    // Create new user login info
    await prisma.user_login_info.create({
      data: {
        username,
        hash_password: hashedPassword,
        user_role: 'diagnostician',
      },
    });

    // Create new diagnostician info
    const newDiagnostician = await prisma.diagnostician_info.create({
      data: {
        username,
        name,
        phone,
        email,
      },
    });

    return newDiagnostician;
  } catch (error) {
    console.error("Error adding new diagnostician:", error);
    throw error;
  }
}

async function deleteDoctor(username) {
  try {
    // Delete doctor info
    const deletedDoctor = await prisma.doctor_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedDoctor;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
}

async function deleteReceptionist(username) {
  try {
    // Delete receptionist info
    const deletedReceptionist = await prisma.receptionist_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedReceptionist;
  } catch (error) {
    console.error("Error deleting receptionist:", error);
    throw error;
  }
}

async function deleteIntern(username) {
  try {
    // Delete intern info
    const deletedIntern = await prisma.intern_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedIntern;
  } catch (error) {
    console.error("Error deleting intern:", error);
    throw error;
  }
}

async function deleteDiagnostician(username) {
  try {
    // Delete diagnostician info
    const deletedDiagnostician = await prisma.diagnostician_info.delete({
      where: {
        username,
      },
    });

    // Delete user login info
    await prisma.user_login_info.delete({
      where: {
        username,
      },
    });

    return deletedDiagnostician;
  } catch (error) {
    console.error("Error deleting diagnostician:", error);
    throw error;
  }
}








module.exports = {getAllUsers, addDoctor, addReceptionist, addIntern, addDiagnostician, deleteDoctor, deleteReceptionist, deleteIntern, deleteDiagnostician};
