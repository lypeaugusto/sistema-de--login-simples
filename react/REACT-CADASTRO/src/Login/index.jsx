import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../../servers/api";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    console.log('Dados enviados:', userData);

    try {
      const response = await api.post('/login', userData);

      console.log('Resposta do servidor:', response);
      const token = response.data.token;
      localStorage.setItem('token', token);

      if (response.status === 200 || response.status === 201) {
        navigate('/listar-usuarios');
      } else {
        alert('Senha ou email incorretos!');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Senha ou email incorretos!');
      } else {
        alert('Erro ao realizar login!');
      }
      console.error('Erro:', error);
      console.error('Detalhes do erro:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <div className="mx-auto max-w-md mt-10 p-8 border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-grey">Login</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input ref={emailRef} type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Email" autoComplete="email" />
        
        <label htmlFor="password"></label>
        <input ref={passwordRef} type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Senha" autoComplete="new-password" />
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-400">Login</button>
      </form>
      <Link to="/cadastro" className=" hover:underline mt-4 block text-center">Já tem uma conta? Faça login</Link>
    </div>
  );
}

export default Login;