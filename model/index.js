const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.PORT); 

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.URL;
db.people=require("./personal_details.model")
db.corona_details=require("./corona_details.model")

module.exports = db;
