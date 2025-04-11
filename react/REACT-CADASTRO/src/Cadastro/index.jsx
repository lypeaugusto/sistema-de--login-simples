import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "../../servers/api";

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    console.log('Dados enviados:', userData);

    try {
      const response = await api.post('/cadastro', userData);

      console.log('Resposta do servidor:', response);

      if (response.status === 200 || response.status === 201) {
        alert('Usuário cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar usuário!');
      }
    } catch (error) {
      alert('Erro ao cadastrar usuário!');
      console.error('Erro:', error);
      console.error('Detalhes do erro:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <div className="mx-auto max-w-md mt-10 p-8 border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-grey">Cadastro</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input ref={nameRef} type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Nome" autoComplete="name" />
        
        <label htmlFor="email"></label>
        <input ref={emailRef} type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Email" autoComplete="email" />
        
        <label htmlFor="password"></label>
        <input ref={passwordRef} type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" placeholder="Senha" autoComplete="new-password" />
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-400">Cadastre-se</button>
      </form>
      <Link to="/Login" className="bg-blue-700 hover:underline mt-4 block text-center">já tem uma conta? Faça login</Link>
    </div>
  );
}

export default Cadastro;