const { Client } = require('pg');
const oracledb = require('oracledb');

async function moveData() {
  // PostgreSQL connection
  const pgClient = new Client({
    user: 'postgres_user',
    host: 'localhost',
    database: 'postgres_db',
    password: 'password',
    port: 5432,
  });
  await pgClient.connect();

  // Oracle connection
  await oracledb.createPool({
    user: 'oracle_user',
    password: 'password',
    connectString: 'localhost:1521/orcl',
  });
  const oracleConnection = await oracledb.getConnection();

  try {
    // Retrieve data from PostgreSQL
    const { rows } = await pgClient.query('SELECT * FROM pg_table');

    // Bulk insert into Oracle
    const batchSize = 1000; // Adjust batch size as needed
    const dataChunks = [];
    for (let i = 0; i < rows.length; i += batchSize) {
      const chunk = rows.slice(i, i + batchSize);
      const values = chunk.map(row => `(${row.column1}, ${row.column2})`).join(',');
      dataChunks.push(values);
    }
    const insertQuery = `INSERT INTO oracle_table (column1, column2) VALUES ${dataChunks.join(',')}`;
    await oracleConnection.execute(insertQuery);

    console.log('Data transfer successful');
  } catch (error) {
    console.error('Error transferring data:', error);
  } finally {
    await pgClient.end();
    await oracleConnection.close();
  }
}

moveData();
