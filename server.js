const express = require('express');
const multer = require('multer');
const { readLasFile } = require('las-reader');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('lasFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    if (req.file.mimetype !== 'application/octet-stream') {
      return res.status(400).send('Invalid file type. Please upload a LAS file.');
    }

    const lasFileBuffer = req.file.buffer;
    const lasData = readLasFile(lasFileBuffer);
    res.status(200).send({ lasData });
  } catch (error) {
    console.error('Error processing the file:', error.message);
    res.status(500).send('An error occurred while processing the file.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
