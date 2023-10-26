const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPostForUser = async (req, res) => {
  const { title, content,authorId } = req.body;
  try {
    // Create a Post associated with a specific User
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } }
      },
    });

    res.send({
      message: "Successfully created a post for the user 👍🥰",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.send({ message: "Error creating post for user" });
  }
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
    res
      .status(500)
      .send({ error: "Failed to fetch Post by ID 😪🥹", details: error });
  }
};

// get all posts
const getAllPost = async (req, res) => {
  const result = await prisma.Post.findMany();
  res.send({ message: "Successfully to find all users 🦄🥰", data: result });
};

// update post
const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, published } = req.body;

  try {
    const result = await prisma.Post.update({
      where: { id },
      data: { title, content, published },
    });
    res.send({ message: "Successfully updated post", data: result });
  } catch (err) {
    console.error(err);
    res.send({ message: "Failed to update post", error: err });
  }
};
// Deltet posh
const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await prisma.Post.delete({
      while: { id },
    });
    res.send({ message: "Successfully deleted post ", data: result });
  } catch (err) {
    console.error(err);
    res.send({ message: "Failed to delete post 😪🥹", error: err });
  }
};
module.exports = {
  createPostForUser,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};
