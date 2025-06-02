const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts'
})

client.connect()
.then(() => console.log('Conectado ao banco de dados!'))
.catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}
