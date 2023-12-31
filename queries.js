const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.xawskkrtjldhmbzpgnvx.supabase.co',
  database: 'postgres',
  password: 'KFkop4mKOskLR5FV3jlZtTa7FVy7pnW3',
  port: 5432,
})

const getCurriculo = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCurriculoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCurriculo = (request, response) => {
  const { nome, contato, habilidade } = request.body

  pool.query('INSERT INTO curriculo (nome, contato, habilidade) VALUES ($1, $2, $3, )', [nome, contato, habilidade], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, contato, habilidade } = request.body

  pool.query(
    'UPDATE curriculo SET nome = $1, contato = $2, habilidade = $3 WHERE id = $4',
    [nome, contato, habilidade, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getCurriculo,
  getCurriculoById,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
}