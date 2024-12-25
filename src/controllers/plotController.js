const pool = require('../config/db');

const savePlot = async (req, res) => {
    const { email, funcInput } = req.body;

    // Log incoming data for debugging (optional)
    console.log('Received data:', JSON.stringify(req.body));
    console.log(funcInput)

    // Validate the input
    if (!email || !funcInput) {
        return res.status(400).json({
            message: 'Email and function are required.',
        });
    }

    try {
        console.log("Trying query from database...");
        const result = await pool.query(
            `SELECT add_user_math_function($1, $2) AS message`,
            [email, funcInput]
        );

        // Return success response with the message
        return res.status(201).json({
            message: result.rows[0].message,
        });
    } catch (error) {
        console.error('Error saving plot:', error.message);

        // Return error response
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = { savePlot };
