// generateData.js

const faker = require('faker');
const fs = require('fs');

const generateUsers = (numUsers) => {
  let users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      id: i + 1,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      // other fields as needed
    };
    users.push(user);
  }
  return { users };
};

const data = generateUsers(10); // Generate 10 users

fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
