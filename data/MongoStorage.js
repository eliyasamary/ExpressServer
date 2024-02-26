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
 async functions
 ***************************************************************************************/
  async find() {
    return await this.Model.find();
  }
  async retrieve(id) {
    return await this.Model.findById(id);
  }
  async create(data) {
    const donation = await new this.Model(data);
    await donation.save();
    return donation;
  }
  async update(id, data) {
    return await this.Model.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return await this.Model.findByIdAndDelete(id);
  }
};
