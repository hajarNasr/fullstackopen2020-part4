const dummy = (posts) => posts.length;

const totalLikes = (posts) => posts.reduce((sum, post) => sum + post.likes, 0);

const favoritePost = (posts) => {
  const max = Math.max(...posts.map((post) => post.likes));
  return posts.find((post) => post.likes === max);
};

const mostPosts = (posts) => {
  const authors = posts.map((post) => post.author);

  const objs = authors.map((author) => {
    return {
      author,
      blogs: posts.filter((post) => post.author === author).length,
    };
  });

  const max = Math.max(...objs.map((obj) => obj.blogs));
  return objs.find((obj) => obj.blogs === max);
};

const mostLikes = (posts) => {
  const authors = posts.map((post) => post.author);
  const objs = authors.map((author) => {
    return {
      author,
      likes: posts
        .filter((post) => post.author === author)
        .reduce((sum, post) => sum + post.likes, 0),
    };
  });

  const max = Math.max(...objs.map((obj) => obj.likes));
  return objs.find((obj) => obj.likes === max);
};

module.exports = {
  dummy,
  totalLikes,
  favoritePost,
  mostPosts,
  mostLikes,
};
