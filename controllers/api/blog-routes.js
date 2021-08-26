const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require('../../utils/auth');

// get all Blogs
router.get("/", (req, res) => {
  console.log("======================");
  Blog.findAll({
    attributes: [
      "id",
      "blog_content",
      "title",
      "created_at",
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        }
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single blog
router.get("/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "blog_content",
      "title",
      "created_at",
    ],
    include: [
        {
            model: Comment,
            attributes: ["id", "comment_text", "blog_id", "user_id", "created_at"],
            include: {
              model: User,
              attributes: ["username"],
            }
        },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogData) => {
      if (!dbBlogData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      res.json(dbBlogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create blog
router.post("/", withAuth, (req, res) => {
  Blog.create({
    title: req.body.title,
    blog_content: req.body.blog_content,
    user_id: req.session.user_id
  })
    .then((dbBlogData) => res.json(dbBlogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update blog
router.put("/:id", withAuth, (req, res) => {
  Blog.update(
    {
      title: req.body.title,
      blog_content: req.body.blog_content
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBlogData) => {
      if (!dbBlogData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      res.json(dbBlogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete blog
router.delete("/:id", withAuth, (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbBlogData) => {
      if (!dbBlogData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      res.json(dbBlogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
