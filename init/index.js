const mongoose = require("mongoose");
const initData = require("./sampleData.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({
    ...obj,
    owner: '6855a132b4e90cd0200e3fab',
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();