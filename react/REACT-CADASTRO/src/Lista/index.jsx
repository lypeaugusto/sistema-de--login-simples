import { useEffect, useState } from "react";
import api from "../../servers/api";

function ListarUsuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
      try {
        const response = await api.get('/list-user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Resposta do servidor:', response);
        setUsers(response.data); 
        console.log('Usuários:', response.data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        console.error('Detalhes do erro:', error.response ? error.response.data : error.message);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="mx-auto max-w-md mt-10 p-8 border border-gray-300">
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;