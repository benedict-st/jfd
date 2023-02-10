const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.products = require("./Products");
db.categories = require("./Categories");

module.exports = db;
