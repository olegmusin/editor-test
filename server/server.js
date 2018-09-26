const fs = require('fs');

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const junk = require('junk');

const port = 5000;
const app = express();

// CORS issue fix (localhost:3000 to localhost:5000)
app.use(cors());

app.use(express.static('./'));

// define file name and destination to save
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/images`);
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split('.');
    ext = ext[ext.length - 1];
    cb(null, `uploads-${Date.now()}.${ext}`);
  },
});

// define what file type to accept
const filter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb('Failed: format not supported');
  }
};

// set multer config
const upload = multer({
  storage,
  fileFilter: filter,
}).single('file');

/* ===============================
  ROUTE
 ============================== */

// route for file upload
app.post('/uploads', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err });
    } else {
      res.status(200).json({
        file: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      });
    }
  });
});

app.get('/images', (req, res) => {
  const filePath = `${req.protocol}://${req.get('host')}/images/`;
  let files = fs.readdirSync('./images/');

  files = files
    .filter(junk.not) // remove .DS_STORE etc
    .map(f => filePath + f); // map with url path

  res.json(files);
});

app.listen(port, () => {
  console.log(`Image Server started. listening to ${port}`);
});

