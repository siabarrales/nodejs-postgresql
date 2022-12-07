const { Client } = require('pg');

const getConnection = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'admin',
    password: 'admin123',
    database: 'my_store',
  });

  await client.connect();
  return client;
};

module.exports = getConnection;
