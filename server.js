const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();

const corsOptions = {
    origin: 'https://frontend-prjd.vercel.app', 
    methods: 'GET,POST',
    optionsSuccessStatus: 200 
};

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// POST Route to handle requests
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input format' });
    }

    // Segregate numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (highestAlphabet === '' || item.toLowerCase() > highestAlphabet.toLowerCase()) {
                highestAlphabet = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "Arpit_Tripathi_15122003",
        email: "ad3617@srmist.edu.in",
        roll_number: "RA2111003030013",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

// GET Route to return operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;