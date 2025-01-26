const Post = require("../models/post-model");
const Reply = require("../models/reply-model");

exports.createPost = async (req, res, next) => {
  const { username, content } = req.body;
  try {
    const newPost = new Post({
      username,
      content,
      date: new Date().toISOString(),
      replies: [],
    });
    await newPost.save();
    return res.status(201).json({
      message: "Post created successfully!",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "replies",
      populate: {
        path: "replies",
        model: "Reply",
      },
    });
    return res.status(200).json({
      message: "Posts retrieved successfully!",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.addReply = async (req, res, next) => {
  const { postId } = req.params;
  const { username, content, parentReplyId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    const newReply = new Reply({
      username,
      content,
      postId,
      parentReplyId: parentReplyId || null,
    });
    await newReply.save();
    if (parentReplyId) {
      const parentReply = await Reply.findById(parentReplyId);
      if (parentReply) {
        parentReply.replies.push(newReply._id);
        await parentReply.save();
      }
    } else {
      post.replies.push(newReply._id);
      await post.save();
    }
    return res.status(201).json({
      message: "Reply added successfully!",
      data: newReply,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found!" });
    }
    await Reply.deleteMany({ postId: postId });
    return res.status(200).json({
      message: "Post deleted successfully!",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params;
  const { parentReplyId } = req.query;
  try {
    const deletedReply = await Reply.findByIdAndDelete(commentId);
    if (!deletedReply) {
      return res.status(404).json({ message: "Comment not found!" });
    }
    if (parentReplyId) {
      const parentReply = await Reply.findById(parentReplyId);
      if (parentReply) {
        parentReply.replies = parentReply.replies.filter(
          (r) => r.toString() !== commentId,
        );
        await parentReply.save();
      }
    } else {
      const post = await Post.findById(postId);
      if (post) {
        post.replies = post.replies.filter((r) => r.toString() !== commentId);
        await post.save();
      }
    }
    return res.status(200).json({
      message: "Comment deleted successfully!",
      data: deletedReply,
    });
  } catch (error) {
    next(error);
  }
};
