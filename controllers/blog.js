const Blog = require("../models/Blog");

exports.getAllPosts = async (request, response) => {
  const posts = await Blog.find({});
  response.json(posts);
};

exports.getPost = async (request, response) => {
  const postId = request.params.postId;
  const post = await Blog.findById(postId);
  response.json(post);
};

exports.addPost = async (request, response) => {
  const post = request.body;
  const newPost = new Blog(post);
  await newPost.save();
  response.json(post);
};

exports.updatePost = async (request, response) => {
  const postId = request.params.postId;
  const updatedPost = await Blog.findByIdAndUpdate(postId, request.body, {
    new: true,
  });
  response.json(updatedPost);
};

exports.deletePost = async (request, response) => {
  const postId = request.params.postId;
  await Blog.findByIdAndRemove(postId).exec();

  response.status(204).end();
};
