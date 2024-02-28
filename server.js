const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const { donationsRouter } = require("./routers/donationsRouter.js");
const { NotFoundError } = require("./errors/errors");

const app = express();
const port = process.env.PORT || 8080;

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(
  logger("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.use(cors());

app.use("/donations", donationsRouter);

app.all("*", (req, res) => {
  const err = new NotFoundError(`couldn't found : ${req.originalUrl}`);
  res.status(404);
  res.json({
    name: err.name,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
