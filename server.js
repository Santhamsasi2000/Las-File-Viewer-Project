const express = require('express'); // For Creating the Server
const multer = require('multer'); // Middleware for  handling file Uploads
const {readLasFile} = require("las-reader"); // Library for reading las Files

const app = express();
const port = process.env.PORT || 3000 ;

//Multer configuration for File Upload
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//Upload Endpoint
app.post("/upload",upload.single("lasFile"),(req,res)=>{
    if(!req.file)
    {
       return res.status(400).send(" No Files were uploaded");
    }
    const lasFileBuffer = req.file.buffer;
    // Process LAS File using las-reader or other-libraries
    const lasData = readLasFile(lasFileBuffer);
    //Store or Process lasData as needed
    res.status(200).json({lasData});
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});