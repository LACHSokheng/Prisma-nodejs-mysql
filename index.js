const express = require("express");
const app = express();

app.use(express.json());
const studentRoutes = require("./src/controllers/student.controller");
const tutorialRoutes = require("./src/controllers/tutorial.controller");
const userRoutes = require("./src/controllers/user.controller");
const postRoutes = require("./src/controllers/post.controller");


// Routes management
app.use("/students", studentRoutes);
app.use("/tutorials", tutorialRoutes);
app.use("/User", userRoutes);
app.use("/Post", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});

// await prisma.$disconnect();

