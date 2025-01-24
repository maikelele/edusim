const pool = require("../config/db");

const savePhysics = async (req, res) => {
    const { email, acceleration, velocity } = req.body;

    //console.log("Received data: ", email, acceleration, velocity)
    if (!email || !acceleration || !velocity) {
        return res.status(400).json({
            message: 'Email, acceleration and velocity are required.',
        });
    }

    try {
        //console.log("Trying query from database...");
        const result = await pool.query(
            `SELECT insert_usr_acc_vel($1, $2, $3) AS message`,
            [email, acceleration, velocity]
        )

        return res.status(201).json({
            message: result.rows[0].message,
        })
    } catch (error) {
        console.error("Error saving physics:", error.message);
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
}

const getPhysics = async (req, res) => {
    const { email } = req.body;
    //console.log("Email: " + email);

    if (!email) {
        return res.status(400).json({
            message: 'Email is required.',
        });
    }

    const physics = [];

    try {
        //console.log("Retrieving physics from database for email: " + email);
        const result = await pool.query(
            `SELECT * FROM get_usr_acc_val($1)`,
            [email]
        );
        //console.log("Data retrieved")
        //console.log(result.rows)
        result.rows.forEach(row => {
            physics.push({
                acceleration: row.acceleration_value,
                velocity: row.velocity_value,
            })
        });

        physics.forEach(element => {
            //console.log("Acceleration: " + element.acceleration + ", Velocity: " + element.velocity);
        })

        return res.status(200).json({
            physics,
        });
    } catch (error) {
        console.error("Error retrieving physics details: " + error.message);
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
}

module.exports = { savePhysics, getPhysics };