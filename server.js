const express = require('express'); // For Creating the Server
const multer = require('multer'); // Middleware for  handling file Uploads
const {readLasFile} = require("las-reader"); // Library for reading las Files