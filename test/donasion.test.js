/* eslint-disable no-undef */
/***************************************************************************************
 * TESTS
 
 - test using jest
***************************************************************************************/

const request = require("supertest");
const app = require("../server");
const donationRepository = require("../repositories/donationsRepository");
const { ServerError } = require("../errors/errors");

jest.mock("../repositories/donationsRepository");

// GET all donations
describe("GET /donations/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return all donations", async () => {
    const mockDonations = [
      {
        id: "1",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
      {
        id: "2",
        donorName: "mendi",
        amount: "300",
        location: "modiin",
      },
    ];
    donationRepository.find.mockResolvedValue(mockDonations);

    const res = await request(app).get("/donations/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDonations);
  });

  // FAILURE - 404
  it("should return 404 when no donations are found", async () => {
    donationRepository.find.mockResolvedValue([]);

    const res = await request(app).get("/donations/");
    expect(res.statusCode).toEqual(404);
  });

  // FAILURE - 500
  it("should return 500 when an error occurs", async () => {
    donationRepository.find.mockRejectedValue(
      new ServerError("Internal server error")
    );

    const res = await request(app).get("/donations/");
    expect(res.statusCode).toEqual(500);
  });
});

// GET donation by id
describe("GET /donations/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return a donations", async () => {
    const mockDonation = [
      {
        id: "1",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
    ];

    donationRepository.retrieve.mockImplementation(async (id) => {
      if (id === "1") {
        return mockDonation;
      } else {
        return [];
      }
    });

    const res = await request(app).get("/donations/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDonation);
  });

  // FAILURE - 404
  it("should return 404 when the specific donation not found", async () => {
    const mockDonation = [
      {
        id: "17",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
    ];

    donationRepository.retrieve.mockImplementation(async (id) => {
      if (id === "17") {
        return mockDonation;
      } else {
        return [];
      }
    });

    const res = await request(app).get("/donations/2");
    expect(res.statusCode).toEqual(404);
  });

  // FAILURE - 400
  it("should return 400 when id not vaild", async () => {
    const mockDonation = [
      {
        id: " ",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
    ];
    donationRepository.retrieve.mockResolvedValue(mockDonation);

    const res = await request(app).get("/donations/:id");
    expect(res.statusCode).toEqual(400);
  });
});

// POST donation
describe("POST /donations/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 201
  it("should return 201 when a donation created", async () => {
    const mockDonation = [
      {
        id: "7",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
    ];
    donationRepository.create.mockResolvedValue(mockDonation);

    const res = await request(app).post("/donations/");
    expect(res.statusCode).toEqual(201);
  });

  // FAILURE - 400
  it("should return 400 when missing attributes to create donation", async () => {
    const mockDonation = [
      {
        id: "8",
        donorName: "eliya",
        amount: "200",
      },
    ];
    donationRepository.create.mockResolvedValue(mockDonation);

    const res = await request(app).post("/donations/").send(mockDonation);
    expect(res.statusCode).toEqual(400);
  });

  // FAILURE - 400
  it("should return 400 when try do create a donation with id that already exists", async () => {
    const mockDonation = [
      {
        id: "1",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
    ];

    donationRepository.retrieve.mockResolvedValue([mockDonation]);
    donationRepository.create.mockResolvedValue(mockDonation);

    const res = await request(app).post("/donations/").send(mockDonation);
    expect(res.statusCode).toEqual(400);
  });
});

// PUT donation by id
describe("PUT /donations/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 200
  it("should return 200 after update", async () => {
    const mockDonations = [
      {
        id: "1",
        amount: "300",
      },
    ];
    donationRepository.update.mockResolvedValue(mockDonations);

    const res = await request(app).put("/donations/1");
    expect(res.statusCode).toEqual(200);
  });

  // FAILURE - 400
  it("should return 400 when id not vaild", async () => {
    const mockDonations = [
      {
        id: "23",
      },
    ];
    donationRepository.update.mockResolvedValue(mockDonations);

    const res = await request(app).put("/donations/23");
    expect(res.statusCode).toEqual(400);
  });

  // FAILURE - 400
  it("should return 400 when there are no details to update", async () => {
    const mockDonations = [{}];
    donationRepository.update.mockResolvedValue(mockDonations);

    const res = await request(app).put("/donations/1").send(mockDonations);
    expect(res.statusCode).toEqual(400);
  });
});

// DELETE donation by id
describe("DELETE /donations/", () => {
  beforeEach(() => jest.clearAllMocks());

  // SUCCESS - 204
  it("should return 204 after delete", async () => {
    const mockDonation = [
      {
        id: "7",
        donorName: "eliya",
        amount: "200",
        location: "modiin",
      },
    ];
    donationRepository.deletee.mockResolvedValue(mockDonation);

    const res = await request(app).delete("/donations/7");
    expect(res.statusCode).toEqual(204);
  });

  // FAILURE - 404
  it("should return 404 when donation to delete is not found", async () => {
    const mockDonation = [];
    donationRepository.deletee.mockResolvedValue(mockDonation);

    const res = await request(app).delete("/donations/1");
    expect(res.statusCode).toEqual(404);
  });

  // FAILURE - 400
  it("should return 400 when id not valid", async () => {
    const mockDonation = [
      {
        id: " ",
      },
    ];
    donationRepository.delete.mockResolvedValue(mockDonation);

    const res = await request(app).delete("/donations/");
    expect(res.statusCode).toEqual(400);
  });
});
