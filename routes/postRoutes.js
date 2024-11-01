const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  enlistPostsController,
  userPostsController,
  userPostDeleteController,
  userPostUpdateController,
} = require("../controllers/postController");

// Router object
const router = express.Router();

// create post || post method
router.post("/post-creation", requireSignIn, createPostController);

// posts list || get method
router.get("/posts-list", enlistPostsController);

// user posts list || get method
router.get("/user-posts-list", requireSignIn, userPostsController);

// remove user post || delete method
router.delete("/post-delete/:id", requireSignIn, userPostDeleteController);

// update user post || put method
router.put("/post-update/:id", requireSignIn, userPostUpdateController);

//export
module.exports = router;
