const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));

app.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed" });
    }
    res.status(200).send({ message: "File Uploaded" });
  });
});

app.listen(port, () => {
  console.log("Server running successfully on " + port);
});
