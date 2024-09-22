const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime-types'); // Import mime-types to detect MIME type

const app = express();

const corsOptions = {
    origin: 'https://frontend-prjd.vercel.app/', // Replace with your frontend URL in production
    methods: 'GET,POST',
    optionsSuccessStatus: 200 // For older browsers
};
app.use(cors)
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' })); // Increased limit for file size

// Helper function to validate base64 string and extract file info
const validateFile = (file_b64) => {
    if (!file_b64) return { isValid: false, mimeType: null, fileSizeKB: 0 };

    try {
        const buffer = Buffer.from(file_b64, 'base64'); // Decode the base64 string
        const fileSizeKB = (buffer.length / 1024).toFixed(2); // File size in KB

        // Check for a valid MIME type using the first few bytes (magic numbers)
        const mimeType = mime.lookup(buffer.subarray(0, 4));
        if (!mimeType) return { isValid: false, mimeType: null, fileSizeKB };

        return { isValid: true, mimeType, fileSizeKB };
    } catch (err) {
        return { isValid: false, mimeType: null, fileSizeKB: 0 };
    }
};

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercase = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercase = lowercase.sort().pop() || null;

    // File validation
    const { isValid, mimeType, fileSizeKB } = validateFile(file_b64);

    const response = {
        "is_success": true,
        "user_id": "Arpit_Tripathi", // Example user_id
        "email": "ad3617@srmist.edu.in",
        "roll_number": "RA2111003030013",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercase ? [highestLowercase] : [],
        "file_valid": isValid,
        "file_mime_type": mimeType || "unknown",
        "file_size_kb": fileSizeKB
    };

    res.json(response);
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




module.exports = app;