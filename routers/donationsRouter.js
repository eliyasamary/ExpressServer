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
