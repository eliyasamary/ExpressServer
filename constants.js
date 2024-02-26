/***************************************************************************************
 * CONSTANTS
 ***************************************************************************************/
module.exports = {
  // Constants for DB connection
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  // Constants for use in middleware in controller
  notVaild: "id not vaild",
  validId: "id is ok",
};
