const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://frontend-prjd.vercel.app', 
    methods: 'GET,POST',
    optionsSuccessStatus: 200 
};
app.use(bodyParser.json());

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercase = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercase = lowercase.sort().pop() || null;

    const response = {
        "is_success": true,
        "user_id": "Arpit_Tripath_15122003", // Example user_id
        "email": "ad3617@srmist.edu.in",
        "roll_number": "RA2111003030013",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercase ? [highestLowercase] : [],
        "file_valid": !!file_b64, // File check logic (simplified)
        "file_mime_type": "application/octet-stream", // Default MIME type
        "file_size_kb": file_b64 ? (Buffer.from(file_b64, 'base64').length / 1024).toFixed(2) : null
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