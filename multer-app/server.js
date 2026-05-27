const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3000;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});


const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.send("File Upload Server Running");
});


app.post("/upload", upload.array("file", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.send("No files selected!");
  }

  console.log(req.files);

  let fileList = req.files.map(f => `<li>${f.filename}</li>`).join("");

  res.send(`
    <h2>Upload Success 🎉</h2>
    <p>Uploaded Files:</p>
    <ul>${fileList}</ul>
    <a href="/">Go Back</a>
  `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

