// const seedUsers = require('./user-seeds');
// const seedBlogs = require('./blog-seeds');
// const seedComments = require('./comment-seeds');
const seedData = require('./seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedData();
  console.log('---- seed data ----');
  // await seedUsers();
  // console.log('--------------');

  // await seedBlogs();
  // console.log('--------------');

  // await seedComments();
  // console.log('--------------');

  console.log("all done!");
  process.exit(0);
};

seedAll();
