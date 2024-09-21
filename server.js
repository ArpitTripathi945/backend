const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// POST /bfhl - Handle incoming JSON data
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    let numbers = [];
    let alphabets = [];
    let highestAlphabet = '';

    // Separate numbers and alphabets, and track highest alphabet
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.match(/^[a-zA-Z]$/)) {
            alphabets.push(item);
            if (highestAlphabet === '' || item.toLowerCase() > highestAlphabet.toLowerCase()) {
                highestAlphabet = item;
            }
        }
    });

    res.json({
        "is_success": true,
        "user_id": "your_name_01011990",  // Modify with your details
        "email": "your_email@college.com",
        "roll_number": "YourRollNumber",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highestAlphabet ? [highestAlphabet] : []
    });
});

// GET /bfhl - Return hardcoded operation_code
app.get('/bfhl', (req, res) => {
    res.json({
        "operation_code": 1
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
