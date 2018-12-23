const path = require("path");
const express = require("express");
const publicPath = path.join(__dirname, "..", "public");

const app = express();
const port = process.env.PORT || 3000;

app.use("/", express.static(path.join(publicPath)));
app.listen(port, (err) => {
  if(err) throw err;
  console.log(`Listening on port ${port}.`)
});
