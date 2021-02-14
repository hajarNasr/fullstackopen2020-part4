const Blog = require("../models/Blog");

exports.getAllPosts = (request, response) => {
  Blog.find({}).then((posts) => {
    response.json(posts);
  });
};

exports.getPost = (request, response) => {
  const postId = request.params.postId;
  Blog.findById(postId).then((post) => {
    response.json(post);
  });
};

exports.addPost = (request, response) => {
  const post = request.body;
  const newPost = new Blog(post);
  newPost.save().then((post) => {
    response.json(post);
  });
};

exports.updatePost = (request, response) => {
  const postId = request.params.postId;
  const post = request.body;
  Blog.findByIdAndUpdate(postId, post).then((post) => {
    response.json(post);
  });
};

exports.deletePost = (request, response) => {
  const postId = request.params.postId;
  Blog.findByIdAndRemove(postId)
    .exec()
    .then((res) => {
      response.status(204).end();
    });
};
