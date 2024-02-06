const express = require("express");
const app = express();

const PORT = 80;

app.use(express.static("frontend/dist"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server runnin on Port${PORT}`);
});
