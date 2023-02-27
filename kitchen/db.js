const mongoose = require("mongoose")

const mongoDB = "db link"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}