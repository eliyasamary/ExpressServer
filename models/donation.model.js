/***************************************************************************************
 * DONATIONS MODEL
 
 - using mongoose to create a model for donations
 ***************************************************************************************/

const { Schema, model } = require("mongoose");

const donationsSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    donorName: { type: String, required: true },
    amount: { type: String, required: true },
    location: { type: String, required: true },
  },
  { collection: "Donations" }
);

module.exports = model("Donations", donationsSchema);