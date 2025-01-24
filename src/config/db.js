const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'wickedly-blithe-langur.data-1.euc1.tembo.io',
    database: 'techniki',
    password: 'lkjf&*E(YFUISkfj#FKLJ',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

const getCurrentSchema = async () => {
    try {
        const result = await pool.query('SHOW search_path;');
        console.log('Current schema search path:', result.rows[0].search_path);
    } catch (err) {
        console.error('Error fetching schema:', err.stack);
    }
};

getCurrentSchema();

module.exports = pool;
