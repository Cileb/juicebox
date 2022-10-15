const express = require("express");
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();
  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  console.log("tagName", tagName);

  try {
    const allPosts = await getPostsByTagName(tagName);
    res.send({ allPosts });
  } catch ({ name, message }) {
    next({ success: "false", name, message });
  }
});

module.exports = tagsRouter;

// const posts = allPosts.filter((post) => {
//   return post.active && req.user && post.author.id === req.user.id;
// });

// res.send({ posts });
// use our method to get posts by tag name from the db
// send out an object to the client { posts: // the posts }
