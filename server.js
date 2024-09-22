const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');  // Import multer for file uploads
const cors = require('cors');  
const mime = require('mime-types'); 

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage }); // Middleware to handle file uploads

app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json({ limit: '10mb' })); // JSON parsing

// Helper function to validate uploaded file
const validateFile = (file) => {
    if (!file) return { isValid: false};

    const mimeType = mime.lookup(file.originalname); // Get MIME type from filename
    const fileSizeKB = (file.size / 1024).toFixed(2); // File size in KB

    return { isValid: !!mimeType, mimeType, fileSizeKB };
};

// POST /bfhl to handle data and file upload
app.post('/bfhl', upload.single('file'), (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(JSON.parse(data))) {
            throw new Error('Invalid data format');
        }

        const parsedData = JSON.parse(data);
        const numbers = parsedData.filter(item => !isNaN(item));
        const alphabets = parsedData.filter(item => isNaN(item));
        const lowercase = alphabets.filter(char => char === char.toLowerCase());
        const highestLowercase = lowercase.sort().pop() || null;

        // Validate uploaded file
        const { isValid, mimeType, fileSizeKB } = validateFile(req.file);

        const response = {
            "is_success": true,
            "user_id": "Arpit_Tripathi_15122003",
            "email": "ad3617@srmist.edu.in",
            "roll_number": "RA2111003030013",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highestLowercase ? [highestLowercase] : [],
            "file_valid": isValid,
            "file_mime_type": mimeType || "unknown",
            "file_size_kb": fileSizeKB
        };
        const response2 = {
            "is_success": true,
            "user_id": "Arpit_Tripathi_15122003", // Example user_id
            "email": "ad3617@srmist.edu.in",
            "roll_number": "RA2111003030013",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highestLowercase ? [highestLowercase] : [],
            "file_valid": false
        }
    
        if(isValid){
            res.json(response);
        }else{
            res.json(response2);
        }
    

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            "is_success": false,
            "error": "Invalid data or file upload error",
            "details": error.message
        });
    }
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        "is_success": false,
        "error": "Server error, please try again later"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





module.exports = app;