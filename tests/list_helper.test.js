const {
  dummy,
  totalLikes,
  favoritePost,
  mostPosts,
  mostLikes,
} = require("../utils/list_helper");

test("dummy returns zero", () => {
  expect(dummy([])).toBe(0);
});

test("dummy returns three", () => {
  expect(dummy([1, 2, 3])).toBe(3);
});

describe("totalLikes ", () => {
  test("totalLikes:4", () => {
    expect(totalLikes([{ title: "first", likes: 4 }])).toBe(4);
  });
  test("totalLikes:6", () => {
    expect(
      totalLikes([
        { title: "first", likes: 4 },
        { title: "second", likes: 2 },
      ])
    ).toBe(6);
  });
  test("totalLikes:17", () => {
    expect(
      totalLikes([
        { title: "first", likes: 5 },
        { title: "second", likes: 2 },
        { title: "third", likes: 10 },
      ])
    ).toBe(17);
  });
  test("totalLikes:101", () => {
    expect(
      totalLikes([
        { title: "first", likes: 100 },
        { title: "second", likes: 1 },
      ])
    ).toBe(101);
  });
});

describe("favoritePost ", () => {
  test("favoritePost:4", () => {
    expect(favoritePost([{ title: "first", likes: 4 }])).toEqual({
      title: "first",
      likes: 4,
    });
  });

  test("favoritePost:6", () => {
    expect(
      favoritePost([
        { title: "first", likes: 4 },
        { title: "second", likes: 2 },
      ])
    ).toEqual({ title: "first", likes: 4 });
  });

  test("favoritePost:17", () => {
    expect(
      favoritePost([
        { title: "first", likes: 5 },
        { title: "second", likes: 2 },
        { title: "third", likes: 10 },
      ])
    ).toEqual({ title: "third", likes: 10 });
  });

  test("favoritePost:101", () => {
    expect(
      favoritePost([
        { title: "first", likes: 100 },
        { title: "second", likes: 1 },
      ])
    ).toEqual({ title: "first", likes: 100 });
  });
});

describe("mostPost", () => {
  test("mostPost:1", () => {
    expect(mostPosts([{ title: "first", author: "Author A" }])).toEqual({
      author: "Author A",
      blogs: 1,
    });
  });

  test("mostPost:2", () => {
    expect(
      mostPosts([
        { title: "first", author: "Author A" },
        { title: "second", author: "Author B" },
        { title: "third", author: "Author A" },
      ])
    ).toEqual({
      author: "Author A",
      blogs: 2,
    });
  });

  test("mostPost:2", () => {
    expect(
      mostPosts([
        { title: "first", author: "Author A" },
        { title: "second", author: "Author B" },
        { title: "third", author: "Author B" },
      ])
    ).toEqual({
      author: "Author B",
      blogs: 2,
    });
  });

  test("mostPost:2", () => {
    expect(
      mostPosts([
        { title: "first", author: "Author A" },
        { title: "second", author: "Author B" },
        { title: "third", author: "Author C" },
        { title: "fourth", author: "Author C" },
        { title: "fifth", author: "Author C" },
        { title: "sixth", author: "Author D" },
      ])
    ).toEqual({
      author: "Author C",
      blogs: 3,
    });
  });
});

describe("mostLikes", () => {
  test("mostLikes", () => {
    expect(
      mostLikes([
        { title: "first", author: "Author A", likes: 3 },
        { title: "second", author: "Author B", likes: 20 },
        { title: "third", author: "Author C", likes: 3 },
        { title: "fourth", author: "Author C", likes: 3 },
        { title: "fifth", author: "Author C", likes: 3 },
        { title: "sixth", author: "Author B", likes: 30 },
      ])
    ).toEqual({ author: "Author B", likes: 50 });
  });

  test("mostLikes", () => {
    expect(
      mostLikes([
        { title: "first", author: "Author A", likes: 3 },
        { title: "second", author: "Author B", likes: 4 },
        { title: "third", author: "Author C", likes: 20 },
        { title: "fourth", author: "Author C", likes: 3 },
        { title: "fifth", author: "Author C", likes: 5 },
        { title: "sixth", author: "Author B", likes: 5 },
      ])
    ).toEqual({ author: "Author C", likes: 28 });
  });

  test("mostLikes", () => {
    expect(
      mostLikes([
        { title: "first", author: "Author A", likes: 15 },
        { title: "second", author: "Author B", likes: 20 },
        { title: "third", author: "Author C", likes: 3 },
        { title: "fourth", author: "Author A", likes: 10 },
        { title: "fifth", author: "Author C", likes: 3 },
        { title: "sixth", author: "Author B", likes: 1 },
      ])
    ).toEqual({ author: "Author A", likes: 25 });
  });

  test("mostLikes", () => {
    expect(
      mostLikes([
        { title: "first", author: "Author A", likes: 3 },
        { title: "second", author: "Author B", likes: 20 },
        { title: "third", author: "Author C", likes: 20 },
        { title: "fourth", author: "Author C", likes: 30 },
        { title: "fifth", author: "Author C", likes: 20 },
        { title: "sixth", author: "Author B", likes: 30 },
      ])
    ).toEqual({ author: "Author C", likes: 70 });
  });
});
