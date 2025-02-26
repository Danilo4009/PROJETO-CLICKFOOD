import { useEffect, useState, useRef } from 'react'
import './style.css'
import Logo from '../../assets/logo-clickfood.png'
import api from '../../service/api'

function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // Função para buscar usuários da API
  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  // Função para criar um novo usuário
  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    clearInputs();
    getUsers();
  }

  // Função para deletar um usuário
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  // Função para preencher os inputs com os dados do usuário ao editar
  function editUser(user) {
    inputName.current.value = user.name;
    inputAge.current.value = user.age;
    inputEmail.current.value = user.email;
    setEditingUser(user.id);
  }

  // Função para atualizar um usuário
  async function putUsers() {
    if (!editingUser) return alert("Selecione um usuário para editar!");

    await api.put(`/usuarios/${editingUser}`, {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    setEditingUser(null);
    clearInputs();
    getUsers();
  }

  // Função para limpar os inputs
  function clearInputs() {
    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
  }

  // Buscar os usuários ao carregar a página
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <img src={ Logo }/>
        <h1>Cadastro</h1>
        <input placeholder="Nome" type="text" ref={inputName} />
        <input placeholder="Idade" type="number" ref={inputAge} />
        <input placeholder="E-mail" type="email" ref={inputEmail} />
        <button type="button" onClick={editingUser ? putUsers : createUsers}>
          {editingUser ? "Salvar Alteração" : "Cadastrar"}
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <div className='button'>
            <button className="Alterar" onClick={() => editUser(user)}>Alterar</button>
            <button className="Deletar" onClick={() => deleteUsers(user.id)}>Deletar</button>    
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;