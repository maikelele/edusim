const pool = require('../config/db')

const loginUser = async (req, res) => {
    console.log("Request body: " + req.body)
    const { email, password } = req.body
    console.log("Email: " + email + ", Password: " + password)
    try {
        const results = await pool.query(
            'SELECT email, password from user_credentials WHERE email = $1', [email]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const user = results.rows[0]
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        res.cookie('email', email, {
            httpOnly: false,
            secure: false,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.redirect(`/index.html`);

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const registerUser = async (req, res) => {
    const { email, password } = req.body

    try {
        await pool.query(
            'INSERT INTO user_credentials (email, password) VALUES ($1, $2)',
            [email, password]
        );
        res.status(201).json({
            message: 'User created successfully'
        })
    } catch(err) {
        console.error(err.message)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = { loginUser, registerUser };