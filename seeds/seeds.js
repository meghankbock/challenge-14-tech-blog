const faker = require("faker");

const { User, Post, Comment } = require("../models");

const seedData = async () => {
  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }

  const createdUsers = await User.bulkCreate(userData, {
    individualHooks: true,
  });

  // create post data
  const postData = [];
  for (let i = 0; i < 100; i += 1) {
    const title = faker.lorem.words(Math.round(Math.random() * 9) + 1);
    const post_content = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const user_id = createdUsers[randomUserIndex].id;

    postData.push({ title, post_content, user_id });
  }
  const createdPosts = await Post.bulkCreate(postData);

  // create comment data
  const commentData = [];
  for (let i = 0; i < 100; i += 1) {
    const comment_text = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const post_id = createdPosts[randomPostIndex].id;

    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const user_id = createdUsers[randomUserIndex].id;

    commentData.push({ comment_text, post_id, user_id });
  }
  const createdComments = await Comment.bulkCreate(commentData);
};

module.exports = seedData;
