const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTutorial = async (req, res) => {
  const { title, type, description, published } =
    req.body;

  try {
    const result = await prisma.tutorials.create({
      data: {
        title,
        type,
        description,
        published
      },
    });

    res.status(201).send({ message: "Created successfully🦄", data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Failed to create tutorial", details: error });
  }
};

const getAllTutorial = async (req, res) => {
  const result = await prisma.tutorials.findMany();
  res.send({ message: "Successfully get all🦄🥰", data: result });
};

const getByTutorialID = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await prisma.tutorials.findFirst({
    where: { id },
  });
  res.send({ message: "Successfully get all 🦄🥰", data: result });
};

module.exports = { createTutorial, getAllTutorial, getByTutorialID };
