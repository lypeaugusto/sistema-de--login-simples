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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});