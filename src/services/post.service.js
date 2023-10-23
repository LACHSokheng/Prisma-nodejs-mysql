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
    message: "Successfully created a post for the user 🦄🥰",
    data: post,
  });
};

module.exports = {createPostForUser};
