const Blog = require("../models/Blog");
const User = require("../models/User");

async function resetAll(request, response) {
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.status(204).end();
}

async function resetBlogs(request, response) {
  await Blog.deleteMany({});
  response.status(204).end();
}
module.exports = { resetAll, resetBlogs };
