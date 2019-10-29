const express = require("express");
const PostDb = require("./posts/postDb");
const UserDb = require("./users/userDb");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const port = 5000;
const server = express();
server.use(express.json());
server.use("/user", userRouter);
server.use("/post", postRouter);

const errorHelper = (status, message, res) => {
  res.status(status).json({ error: message });
};

const nameCheckMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorHelper(404, "Name must be included", res);
    next();
  } else {
    next();
  }
};

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
