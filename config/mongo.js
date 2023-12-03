const { MongoClient } = require("mongodb");
// const mongourl = "mongodb://localhost:27017";
const mongourl ="mongodb+srv://Arbab :arbab12345@cluster0.dgj9j39.mongodb.net/";
const mongoserver = new MongoClient(mongourl);

const connection = async () => {
  try {
    await mongoserver.connect();
    console.log("server connected to mongo");
  } catch (err) {
    console.log(`error in ${err}`);
  }
};
const databaseName = mongoserver.db("ecommerce");

module.exports = { connection, databaseName };
