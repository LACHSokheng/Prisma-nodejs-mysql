const express = require("express");
const app = express();

app.use(express.json());
const studentRoutes = require("./src/controllers/student.controller");
const tutorialRoutes = require("./src/controllers/tutorial.controller");

const userRoutes = require("./src/controllers/user.controller");
const postRoutes = require("./src/controllers/post.controller");
const profileRoutes = require("./src/controllers/profile.controller");

// Routes management
app.use("/students", studentRoutes);
app.use("/tutorials", tutorialRoutes);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/profiles", profileRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});

// await prisma.$disconnect();

