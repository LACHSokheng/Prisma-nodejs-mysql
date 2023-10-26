const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create endpoint relationship between user and profile
const createUserWithProfile = async (req, res) => {
  const { email, name, bio } = req.body;

  const profile = bio
    ? {
        create: {
          bio,
        },
      }
    : {};

  // Create a User along with a Profile
  const userWithProfile = await prisma.user.create({
    data: {
      email,
      name,
      profile,
    },
    include: {
      profile: true,
    },
  });

  res.send({
    message: "Successfully created user with profile 🦄🥰",
    data: userWithProfile,
  });
  console.error();
};

const getAllUser = async (req, res) => {
  const result = await prisma.user.findMany();
  res.send({ message: "Successfully to find all users", data: result });
};

// Get by id from profile table
const getUserbyId = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await prisma.user.findUnique({
      where: { id: id },
      include: { profile: { select: { id: true, bio: true } } },
      // select: { email: true, name: true, profile: { select: { bio: true } } },
    });
    res.send({ message: "Successfully User get by id👍😘", data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Failed to Get User by id 🥺😥", details: error });
  }
};

// Update user with profile
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { email, name } = req.body;

  try {
    const result = await prisma.user.update({
      where: { id },
      data: { email, name },
    });
    res.send({ message: "Successfully updated User 👍🥰", data: result });
  } catch (error) {
    console.error(error);
    res.send({ message: "Failed to update User 🥺😥", error: error });
  }
};
// Delete user
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Check if there are associated profiles
    const associatedProfiles = await prisma.profile.findMany({
      where: {
        userId: id,
      },
    });

    if (associatedProfiles.length > 0) {
      // Handle the associated profiles, e.g., delete them or update the references
      // For example, you can delete all associated profiles:
      await prisma.profile.deleteMany({
        where: {
          userId: id,
        },
      });
    }


    const result = await prisma.user.delete({
      where: { id },
    });
    res.send({ message: "Successfully deleted User 🦄🥰", data: result });
  } catch (error) {
    console.error("Delete User",error);
    res.send({ message: "Failed to delete User 😪🥹"});
  }
};

module.exports = {
  getAllUser,
  createUserWithProfile,
  getUserbyId,
  updateUser,
  deleteUser,
};
