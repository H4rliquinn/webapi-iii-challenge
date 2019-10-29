const express = require("express");
const router = express.Router();
const users = require("./userDb");

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.path}`);
  next();
}

router.post("/", (req, res) => {
  const { name } = req.body;
  users
    .insert({ name })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.post("/:id/posts", (req, res) => {});

router.get("/", logger, (req, res) => {
  users
    .get()
    .then(foundUsers => {
      res.json(foundUsers);
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  users
    .get(id)
    .then(user => {
      if (user === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      }
      res.json(user);
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.get("/:userId/posts", (req, res) => {
  const { userId } = req.params;
  users
    .getUserPosts(userId)
    .then(usersPosts => {
      if (usersPosts === 0) {
        return errorHelper(404, "No posts by that user", res);
      }
      res.json(usersPosts);
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(userRemoved => {
      if (userRemoved === 0) {
        return errorHelper(404, "No user by that id");
      } else {
        res.json({ success: "User Removed" });
      }
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users
    .update(id, { name })
    .then(response => {
      if (response === 0) {
        return errorHelper(404, "No user by that id");
      } else {
        db.find(id).then(user => {
          res.json(user);
        });
      }
    })
    .catch(err => {
      return errorHelper(500, "Database boof", res);
    });
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

const nameCheckMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorHelper(404, "Name must be included", res);
    next();
  } else {
    next();
  }
};

module.exports = router;
