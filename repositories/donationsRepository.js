const MongoStorage = require("../data/MongoStorage");
const storage = new MongoStorage("donation");

const find = () => {
  return storage.find();
};

const retrieve = (id) => {
  return storage.retrieve(id);
};

const tocreate = (donation) => {
  return storage.create(donation);
};

const update = (id, donation) => {
  return storage.update(id, donation);
};

const deletee = (id) => {
  return storage.delete(id);
};

module.exports = {
  find,
  retrieve,
  tocreate,
  update,
  deletee,
};
