/***************************************************************************************
 * DONATIONS ROUTER
 
 - import controller functions
 - create an express router
 - routing each request (according to method and route) to the currect consroller function
 ***************************************************************************************/

const {
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
} = require("../controllers/donationsController");

const { Router } = require("express");

const donationsRouter = new Router();

donationsRouter.get("/", getDonations);
donationsRouter.get("/:id", getDonation);
donationsRouter.post("/", createDonation);
donationsRouter.put("/:id", updateDonation);
donationsRouter.delete("/:id", deleteDonation);

module.exports = { donationsRouter };
