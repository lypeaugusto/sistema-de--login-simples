
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './Cadastro';
import Login from './Login';
import ListarUsuarios from './Lista';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listar-usuarios" element={<ListarUsuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
