const pool = require('../config/db');

const getSorting = async (req, res) => {
    const { email } = req.body;
    console.log("Received data: ", email)

    if(!email) {
        return res.status(400).json({
            message: 'Email is required.',
        });
    }

    const sorting = [];
    try {
        console.log("Retrieving sorting from database for email: " + email);
        const result = await pool.query(
            `SELECT * FROM get_user_sorting_details($1)`,
            [email]
        );

        result.rows.forEach(row => {
            sorting.push({
                algorithm_name: row.algorithm_name,
                sorting_speed: row.sorting_speed
            });
        })

        sorting.forEach(element => {
            console.log("Algorithm: " + element.algorithm_name + ", Speed: " + element.sorting_speed);
        })
        return res.status(200).json({
            sorting,
        });
    } catch(error) {
        console.error("Error retrieving sorting details: " + error.message);
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
}

const saveSorting = async (req, res) => {
    console.log("Received data: ", req.body);
    const { email, algorithm, speed } = req.body;
    await pool.query(
        `SELECT * FROM add_user_sorting_with_speed($1, $2, $3)`,
        [email, algorithm, speed]
    )
        .then(result => {
            console.log(result.rows);
        })
    .catch(error => {
        console.error("Error saveSorting: " + error.message);
    });
}

module.exports = { getSorting, saveSorting };