import express from 'express';
import cors from 'cors'; // Importar o middleware cors
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js'; 
import { auth } from './Middlewares/auth.js';

const app = express();

// Configurar CORS
app.use(cors());

app.use(express.json());
app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.post('/cadastro', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Dados recebidos:', { name, email, password });
  // Lógica para salvar os dados no banco de dados
  res.status(201).send('Usuário cadastrado com sucesso!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});