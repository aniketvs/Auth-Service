const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();

app.get("/health", (req, res) => {
  try {
    res.status(200).json({ message: "Server is running" });
  } catch (err) {
    console.log("Error in getting data", err);
    res.status(500).send("Internal Server Error");
    return;
  }
});

const port = process.env.PORT || 3003;
app.listen(port, (err) => {
  if (err) {
    console.log("Error in running server");
    return;
  }
  console.log(`Server is running on port ${port}`);
});
