const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create endpoint relationship between user and profile
const createUserWithProfile = async (req, res) => {
  const { email, name, bio } = req.body;

  // Create a User along with a Profile
  const userWithProfile = await prisma.user.create({
    data: {
      email,
      name,
      profile: {
        create: {
          bio,
        },
      },
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
  res.send({message: "Successfully to find all users", data: result});
}

// Get by id from profile table
const getUserbyId = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await prisma.User.findUnique({
      where: { id: id },
    });
    res.send({ message: "Successfully User get by id👍😘", data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Failed to Get User by id 🥺😥", details: error });
  }
};

module.exports = {getAllUser, createUserWithProfile, getUserbyId };
