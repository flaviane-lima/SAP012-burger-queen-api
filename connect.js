const { MongoClient } = require('mongodb');

const config = require('./config');

// eslint-disable-next-line no-unused-vars
const { dbUrl } = config;

let db;

async function connect() {
  if (db) {
    return db;
  }
  // TODO: Database Connection
  const client = new MongoClient(dbUrl);
  try {
    await client.connect();
    db = client.db('bq'); // Reemplaza <NOMBRE_DB> por el nombre del db
    return db;
  } catch (e) {
    console.error(e);
  }
}


module.exports = { connect };
