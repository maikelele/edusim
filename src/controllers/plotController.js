const pool = require('../config/db');

const savePlot = async (req, res) => {
    const { email, funcInput } = req.body;

    // Log incoming data for debugging (optional)
    console.log('Received data:', JSON.stringify(req.body));

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

const getPlots = async (req, res) => {
    const { email } = req.body;
    console.log("Email: " + email)

    if (!email) {
        return res.status(400).json({
            message: 'Email is required.',
        });
    }

    const functions = [];

    try {
        console.log("Retrieving functions from database for email: " + email);
        const result = await pool.query(
            `SELECT * FROM get_functions_by_email($1)`,
            [email]
        );

        result.rows.forEach(row => {
            functions.push(row.function_name);
        });

        return res.status(200).json({
            functions,
        });
    } catch (error) {
        console.error('Error retrieving functions:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}

module.exports = { savePlot, getPlots };
