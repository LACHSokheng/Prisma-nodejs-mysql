const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all from profile table
const getAllProfile = async (req, res) => {
  const result = await prisma.profile.findMany();
  res.send({ message: "Successfully get all profile 🥰🦄", data: result });
};

// Get by id from profile table
const getByIdProfile = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await prisma.profile.findUnique({
      where: { id },
    });

    res.send({ message: "Successfully get by id 🥰🦄", data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Failed to fetch Profile by id 😪🥹", details: error });
  }
};
// updat profile table
const updateProfile = async (req, res) => {
  const id = parseInt(req.params.id);
  const { bio } = req.body;

  try {
    const result = await prisma.profile.update({
      where: { id },
      data: { bio },
    });
    res.send({ message: "Successfully update profile 👍🥰", data: result });
  } catch (error) {
    console.error(error);
    res.send({ message: "Failed to update profile 🥺😥", details: error });
  }
};

const createProfile = async (req, res) => {
  const { bio, userId } = req.body;

  if (!userId || !bio) {
    res.status(400).send({ message: "Bio or userId is required" });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    res.status(404).send({ message: "User not found" });
  }

  try {
    const result = await prisma.profile.create({
      data: {
        bio,
        userId,
      },
    });
    res.send({ message: "Successfully insert profile ", data: result });
  } catch (err) {
    console.error("[Profile / Create]: ", err);
    res.send({ message: "Failed to insert profile" });
  }
};

module.exports = {
  getAllProfile,
  getByIdProfile,
  updateProfile,
  createProfile,
};
