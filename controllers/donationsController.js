const {
  find,
  retrieve,
  tocreate,
  update,
  deletee,
} = require("../repositories/donationsRepository");

const {
  NotFoundError,
  BadRequestError,
  ServerError,
} = require("../errors/errors");

const { notVaild, validId } = require("../constants");

// Middelware - Checks whether the id is vaild
const checkVaildId = (id) => {
  if (
    id === null ||
    id === "" ||
    id === "*" ||
    id === undefined ||
    id === 0 ||
    id === "0" ||
    id === ":id" ||
    id.length < 24
  ) {
    return notVaild;
  } else return validId;
};

// GET ALL DONASIONS
const getDonations = async (req, res) => {
  try {
    const donations = await find();
    if (donations.length === 0 || !donations) {
      throw new NotFoundError("Donasions not found.");
    }
    const result = {
      status: 200,
      data: donations,
    };
    res.status(result.status);
    res.json(result.data);
  } catch (error) {
    res.status(error.statusCode);
    res.json({ message: error.message });
  }
};

// GET DONASION BY ID
const getDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const isOkId = checkVaildId(id);
    if (isOkId === notVaild) {
      throw new BadRequestError("Id not vaild.");
    }

    const donation = await retrieve(id);

    if (donation.length === 0 || !donation) {
      throw new NotFoundError(`Donation with id ${id} not found.`);
    }

    const result = {
      status: 200,
      message: "",
      data: donation,
    };

    res.status(result.status);
    res.json(result.message || result.data);
  } catch (error) {
    res.status(error.statusCode || 500);
    if (error.message == "Cannot read properties of null (reading 'length')") {
      res.json({ message: "Donation not found." });
    } else {
      res.json({ message: error.message || "Internal Error" });
    }
  }
};

// CREATE NEW DONATION
const createDonation = async (req, res) => {
  try {
    const { body: donation } = req;
    if (!donation.amount || !donation.donorName || !donation.location) {
      throw new BadRequestError(
        "Cannot create a new donation : missing attributes."
      );
    }

    const newDonation = await tocreate(donation);
    if (!newDonation || newDonation.length === 0) {
      throw new ServerError(
        "Encountered a problem - cannot create a new donation."
      );
    }

    const result = {
      status: 201,
      message: `Donation created successfully !`,
      data: newDonation,
    };
    res.status(result.status);
    res.json(result.message || result.data);
  } catch (error) {
    res.status(error.statusCode);
    res.json({ message: error.message });
  }
};

// UPDATE DONATION BY ID
const updateDonation = async (req, res) => {
  try {
    const {
      body: donation,
      params: { id },
    } = req;
    if (
      !donation.amount &&
      !donation.donorName &&
      !donation.location &&
      !donation.id
    ) {
      throw new BadRequestError("No details to update.");
    }
    const isOkId = checkVaildId(id);
    if (isOkId === notVaild) {
      throw new BadRequestError("Id not valid.");
    }
    const isExsistDonation = await retrieve(id);
    if (isExsistDonation.length === 0) {
      throw new NotFoundError(`No donation with id: ${id} to update.`);
    }
    const updatedDonation = await update(id, donation);
    if (!updatedDonation || updatedDonation.length === 0) {
      throw new ServerError("Encountered a problem - cannot update donation.");
    }
    const result = {
      status: 200,
      message: `Donation #${id} updated successfully !`,
      data: updatedDonation,
    };
    res.status(result.status);
    res.json(result.message || result.data);
  } catch (error) {
    res.status(error.statusCode || 500);
    if (error.message == "Cannot read properties of null (reading 'length')") {
      res.json({ message: "Donation not found." });
    } else {
      res.json({ message: error.message || "Internal Error" });
    }
  }
};

// DELETE DONATION BY ID
const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const isOkId = checkVaildId(id);
    if (isOkId === notVaild) {
      throw new BadRequestError("Id not vaild.");
    }
    const isExsistDonation = await retrieve(id);
    if (isExsistDonation.length === 0 || !isExsistDonation) {
      throw new NotFoundError(`No found donation with id ${id} to delete.`);
    }
    const donationToDelete = await deletee(id);
    if (!donationToDelete || donationToDelete.length === 0) {
      throw new ServerError("Encountered a problem - cannot delete donation.");
    }
    const result = {
      status: 204,
      message: `Donation ${donationToDelete} deleted successfully !`,
      data: donationToDelete,
    };
    res.status(result.status);
    res.json(result.message || result.data);
  } catch (error) {
    res.status(error.statusCode || 500);
    if (error.message == "Cannot read properties of null (reading 'length')") {
      res.json({ message: "Donation not found." });
    } else {
      res.json({ message: error.message || "Internal Error" });
    }
  }
};

module.exports = {
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
};
