const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPostForUser = async (req, res) => {
  const { userId, title, content } = req.body;

  // Create a Post associated with a specific User
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.send({
    message: "Successfully created a post for the user 👍🥰",
    data: post,
  });
};

const getPostById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      
    });
    
    res.send({ message: "Successfully fetched post by ID 🥰🦄", data: post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch Post by ID 😪🥹", details: error });
  }
};


const getAllPost = async (req, res) => {
  const result = await prisma.Post.findMany();
  res.send({message: "Successfully to find all users 🦄🥰", data: result});
}

module.exports = {createPostForUser, getAllPost, getPostById};
