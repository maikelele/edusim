const pool = require('../config/db')

const loginUser = async (req, res) => {
    console.log("Request body: " + req.body)
    const { email, password } = req.body
    console.log("Email: " + email + ", Password: " + password)
    try {
        const results = await pool.query(
            'SELECT * from user_credentials WHERE email = $1 and password = $2',
            [email, password]
        )

        if (results.rows.length === 0) {
            return res.redirect('/login.html?error=User%20not%20found');
        }

        const user = results.rows[0];
        const username = user.username;

        console.log("Username: " + JSON.stringify(username));


        res.cookie('email', email, {
            httpOnly: false,
            secure: false,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.cookie('username', username, {
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
    const { username, email, password } = req.body

    try {
        await pool.query(
            'INSERT INTO user_credentials (email, password, username) VALUES ($1, $2, $3)',
            [email, password, username]
        );
        res.redirect('/login.html');
    } catch(err) {
        console.error(err.message)
        res.redirect('/register.html?error=email%20already%20taken');
    }
}

module.exports = { loginUser, registerUser };