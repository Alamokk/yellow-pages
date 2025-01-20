const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./backend/config/database");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Accept"],
  })
);
app.use(express.json());
app.use("/api/contacts", require("./backend/routes/contactRoutes").default);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is listening at port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to DB!", error);
  });
