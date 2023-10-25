const express = require("express");
require("dotenv").config();
const middlewareSetup = require("./middleware/middlewareSetup"); // Adjust the path based on your project structure

const app = express();

app.use(middlewareSetup);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
