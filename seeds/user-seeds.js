const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userdata = [
  {
    username: 'lebron123',
    email: 'lebron123@test.com',
    password: 'password123'
  },
  {
    username: 'naomi123',
    email: 'naomi123@test.com',
    password: 'password123'
  },
  {
    username: 'serena123',
    email: 'serena123@test.com',
    password: 'password123'
  },
  {
    username: 'giannis123',
    email: 'giannis123@test.com',
    password: 'password123'
  },
  {
    username: 'mahomes123',
    email: 'mahomes123@test.com',
    password: 'password123'
  },
  {
    username: 'messi123',
    email: 'messi123@test.com',
    password: 'password123'
  },
  {
    username: 'ronaldo123',
    email: 'ronaldo123@test.com',
    password: 'password123'
  },
  {
    username: 'rapinoe123',
    email: 'rapinoe123@test.com',
    password: 'password123'
  },
  {
    username: 'neymar123',
    email: 'neymar123@test.com',
    password: 'password123'
  },
  {
    username: 'brady123',
    email: 'brady123@test.com',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
