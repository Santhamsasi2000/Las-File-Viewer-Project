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
    console.log(req.file);
    res.send("File Uploaded");
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      console.log('Uploaded file MIME type:', req.file.mimetype);
  
      // Check for LAS file extension as well
      const fileExtension = req.file.originalname.split('.').pop();
      if (fileExtension !== 'las') {
        return res.status(400).send('Invalid file type. Please upload a LAS file.');
      }
  
      const lasFileBuffer = req.file.buffer;
      const lasData = readLasFile(lasFileBuffer); // This is a potential error point
      res.status(200).send({ lasData });
    } catch (error) {
      console.error('Error processing the file:', error);  // Log the full error object
      res.status(500).send('An error occurred while processing the file.');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
