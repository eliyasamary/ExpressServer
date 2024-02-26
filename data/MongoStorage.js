/***************************************************************************************
 DB connection
 ***************************************************************************************/
const mongoose = require("mongoose");
const consts = require("../constants");
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = consts;

module.exports = class MongoStorage {
  constructor() {
    this.Model = require("../models/donation.model");
    this.connect();
  }

  connect() {
    const connectionUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

    mongoose
      .connect(connectionUrl)
      .then(() => console.log("connected to DB"))
      .catch((err) => console.log(`connection error: ${err}`));
  }

  /***************************************************************************************
 functions
 ***************************************************************************************/
  find() {
    return this.Model.find();
  }
  retrieve(id) {
    return this.Model.findById(id);
  }
  create(data) {
    const donation = new this.Model(data);
    donation.save();
    return donation;
  }
  update(id, data) {
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return this.Model.findByIdAndDelete(id);
  }
};
