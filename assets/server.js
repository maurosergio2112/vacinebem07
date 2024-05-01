const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do pool de conexões com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(bodyParser.json());

// Rota para lidar com o envio das respostas do formulário
app.post('/api/respostas', async (req, res) => {
  try {
    const { respostas } = req.body;
    
    // Verifica se o corpo da requisição contém as respostas
    if (!respostas || !Array.isArray(respostas)) {
      return res.status(400).json({ message: 'Formato de requisição inválido.' });
    }

    // Inicia uma transação
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Itera sobre as respostas e insere no banco de dados
      for (const resposta of respostas) {
        await client.query('INSERT INTO respostas_vacinas (vacina_id, resposta) VALUES ($1, $2)', [resposta.vacinaId, resposta.resposta]);
      }

      // Commit da transação
      await client.query('COMMIT');
      
      // Retorna uma resposta de sucesso
      res.status(201).json({ message: 'Respostas armazenadas com sucesso.' });
    } catch (error) {
      // Rollback em caso de erro
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Libera o cliente do pool
      client.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar as respostas.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
