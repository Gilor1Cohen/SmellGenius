const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./data-access-layer/db");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/Auth", require("./controllers-layer/Auth-Controller"));
app.use("/Perfumes", require("./controllers-layer/Perfumes-Controller"));

app.use((req, res) => {
  res.status(404).send(`Route not found: ${req.originalUrl}`);
});

connectDB()
  .then(() => {
    const server = app.listen(5174, () =>
      console.log("Server listening on port 5174")
    );
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error("Error: Address in use");
      } else {
        console.error("Error: Unknown server error", err);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
