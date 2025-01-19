const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forum-controller");

// Route to create a new post
router.post("/posts", forumController.createPost);

// Route to retrieve all posts
router.get("/posts", forumController.getPosts);

// Route to add a reply to a post
router.post("/posts/:postId/replies", forumController.addReply);

// Route to delete a post
router.delete("/posts/:postId", forumController.deletePost);

module.exports = router;