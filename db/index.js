const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client({
  user: "postgres",
  password: "password01",
  database: "juicebox-dev",
});

const getAllUsers = async () => {
  const { rows } = await client.query(`
  SELECT 
  id, username 
  FROM users;
  `);

  return rows;
};

const createUser = async ({ username, password }) => {
  try {
    const { rows } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
  `,
      [username, password]
    );

    return rows;
  } catch (error) {
    console.log("Error creating user!");
    throw error;
  }
};

module.exports = {
  client,
  getAllUsers,
  createUser,
};
