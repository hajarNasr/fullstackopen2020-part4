const supertest = require("supertest");
const app = require("../index").app;
const jwt = require("jsonwebtoken");
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
  let createUserResponse;
  beforeEach(async () => {
    createUserResponse = await api
      .post("/api/users/")
      .send({ username: "hajar", password: "haj12345" });
  });

  test("Post: adding a new post fails if the token doesn't exist", async () => {
    const newPost = {
      title: "Test Adding a New Post",
      author: "A",
      likes: 15,
      url: "URL",
    };
    await api.post(postURL).send(newPost).expect(401);

    const posts = await api.get(postURL);
    expect(posts.body.length).toBe(initialPosts.length);
  });

  test("Post: adding a new post works if the token is valid", async () => {
    const newPost = {
      title: "Test Adding a New Post",
      author: "A",
      likes: 15,
      url: "URL",
    };
    await api
      .post(postURL)
      .set("Authorization", "bearer " + createUserResponse.body.token)
      .send(newPost)
      .expect(200);

    const posts = await api.get(postURL);
    expect(posts.body.length).toBe(initialPosts.length + 1);
  });

  test("POST: add a new post without likes", async () => {
    const postWithoutLikes = {
      title: "Test Adding a Post Without Likes",
      author: "B",
      url: "URL",
    };
    await api
      .post(postURL)
      .set("Authorization", "bearer " + createUserResponse.body.token)
      .send(postWithoutLikes)
      .expect(200);

    const posts = await api.get(postURL);

    expect(
      posts.body.find((p) => p.title === postWithoutLikes.title).likes
    ).toBe(0);
  });

  test("POST: posts without url or author are invalid", async () => {
    const postWithoutURL = { title: "Invalid Post", author: "A", likes: 15 };
    const postWithoutAuthor = { title: "Invalid Post", likes: 15, url: "URL" };
    await api
      .post(postURL)
      .set("Authorization", "bearer " + createUserResponse.body.token)
      .send(postWithoutAuthor)
      .expect(400);
    await api
      .post(postURL)
      .set("Authorization", "bearer " + createUserResponse.body.token)
      .send(postWithoutURL)
      .expect(400);
  });

  test("DELETE: posts with valid ids can be deleted", async () => {
    const response = await api.get(postURL);
    const firstPostId = response.body[0].id;
    const userId = createUserResponse.body.user.id;
    await api
      .delete(`${postURL}${userId}/${firstPostId}`)
      .set("Authorization", "bearer " + createUserResponse.body.token)
      .expect(204);
    const responseAfterDeletion = await api.get(postURL);
    const postsAfterDeletion = responseAfterDeletion.body;
    expect(postsAfterDeletion.length).toBe(initialPosts.length - 1);
  });
});
afterAll(() => {
  mongoose.connection.close();
});

describe("UPDATE METHOD", () => {
  const URL = "/api/posts/";
  test("UPDATE: posts with valid ids can be updated", async () => {
    const response = await api.get(URL);
    const firstPostId = response.body[0].id;

    await api.put(`${URL}${firstPostId}`).send({ likes: 200 }).expect(200);
  });
});
