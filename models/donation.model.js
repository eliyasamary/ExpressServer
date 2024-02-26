const { Schema, model } = require("mongoose");

const donationsSchema = new Schema(
  {
    donorName: { type: String, required: true },
    amount: { type: String, required: true },
    location: { type: String, required: true },
  },
  { collection: "Donations" }
);

module.exports = model("Donations", donationsSchema);
