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
      where: { id},
    });
    
    res.send({ message: "Successfully get by id 🥰🦄", data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Failed to fetch Profile by id 😪🥹", details: error });
  }
};

module.exports = { getAllProfile, getByIdProfile };
