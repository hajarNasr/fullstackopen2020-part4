const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getAllPosts = async (request, response) => {
  const posts = await Blog.find({}).populate("user", { username: 1, id: 1 });
  response.json(posts);
};

exports.getPost = async (request, response) => {
  const postId = request.params.postId;
  const post = await Blog.findById(postId);
  response.json(post);
};

exports.addPost = async (request, response) => {
  const post = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.JWT);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const newPost = new Blog({ ...post, user: user });
  user.blogs = [...user.blogs, newPost];

  await newPost.save();
  await user.save();
  response.json(post);
};

exports.updatePost = async (request, response) => {
  const postId = request.params.postId;
  const post = request.body;
  delete post.user;
  const updatedPost = await Blog.findByIdAndUpdate(postId, post, { new: true });
  response.json(updatedPost);
};

exports.deletePost = async (request, response) => {
  const { postId, userId } = request.params;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.JWT);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (decodedToken.id !== userId) {
    return response.status(401).json({ error: "Unauthorized access" });
  }

  await Blog.findByIdAndRemove(postId).exec();

  response.status(204).end();
};
