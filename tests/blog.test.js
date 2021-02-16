const supertest = require("supertest");
const app = require("../index").app;
const mongoose = require("mongoose");

const api = supertest(app);
const initialPosts = require("./test_helper").initialPosts;

const Blog = require("../models/Blog");

beforeEach(async () => {
  // clear the database
  await Blog.deleteMany({});
  // create new posts using initialPosts
  for (let post of initialPosts) {
    let newPost = Blog(post);
    await newPost.save();
  }
});

describe("GET METHOD", () => {
  const getURL = "/api/posts/";
  test("GET headers", async () => {
    await api
      .get(getURL)
      .expect(200)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
  });

  test("GET: initialPosts length", async () => {
    const response = await api.get(getURL);

    expect(response.body).toHaveLength(initialPosts.length);
  });

  test("GET: first post's content", async () => {
    const response = await api.get(getURL);

    expect(response.body[0].title).toBe(initialPosts[0].title);
    expect(response.body[0].id).toBeDefined();
  });
});

describe("POST METHOD", () => {
  const postURL = "/api/posts/";
  test("Post: add a new post", async () => {
    const newPost = {
      title: "Test Adding a New Post",
      author: "A",
      likes: 15,
      url: "URL",
    };
    await api.post(postURL).send(newPost).expect(200);

    const posts = await api.get(postURL);
    expect(posts.body.length).toBe(initialPosts.length + 1);
  });

  test("POST: add a new post without likes", async () => {
    const postWithoutLikes = {
      title: "Test Adding a Post Without Likes",
      author: "B",
      url: "URL",
    };
    await api.post(postURL).send(postWithoutLikes).expect(200);

    const posts = await api.get(postURL);

    expect(
      posts.body.find((p) => p.title === postWithoutLikes.title).likes
    ).toBe(0);
  });

  test("POST: posts without url or author are invalid", async () => {
    const postWithoutURL = { title: "Invalid Post", author: "A", likes: 15 };
    const postWithoutAuthor = { title: "Invalid Post", likes: 15, url: "URL" };
    await api.post(postURL).send(postWithoutAuthor).expect(400);
    await api.post(postURL).send(postWithoutURL).expect(400);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
