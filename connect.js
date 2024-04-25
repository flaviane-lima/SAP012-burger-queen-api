const mongoose = require('mongoose');
const config = require('./config');

const { dbUrl } = config;
console.info(dbUrl);
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://rflaviane41:GRorhoq5ZEMNJ6fm@cluster0.tpihri1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=bq');
  } catch (error) {
    console.error(`Erro: ${error}`);
  }
}
module.exports = { connect };
