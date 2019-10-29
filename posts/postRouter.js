const express = require("express");
const router = express.Router();
const posts = require("./postDb");

router.get("/", (req, res) => {
  posts
    .get()
    .then(foundPosts => {
      res.json(foundPosts);
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  posts
    .get(id)
    .then(post => {
      if (post === 0) {
        return errorHelper(404, "No post by that Id in the DB", res);
      }
      res.json(post);
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.post("/api/posts", (req, res) => {
  const { userId, text } = req.body;
  posts
    .insert({ userId, text })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
