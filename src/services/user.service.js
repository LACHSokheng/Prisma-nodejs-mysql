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

// create endpoint relationship between user and Post
const createUserWithPosts = async (req, res) => {
  const { title, email, name, posts } = req.body;

  // Create a User and associated Posts
  const userWithPosts = await prisma.user.create({
    data: {
      email,
      name,
      title,
      posts: {
        create: posts.map((post) => {
          return {
            title: post.title,
            content: post.content,
          };
        }),
      },
    },
    include: {
      posts: true,
    },
  });

  res.send({
    message: "Successfully created user with posts 🦄🥰",
    data: userWithPosts,
  });
};


module.exports = { createUserWithProfile, createUserWithPosts };
