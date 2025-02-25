import "./style.css";

function Home() {
  const users = [
    {
      id: "sdasdadsa",
      name: "Rodolfo",
      age: 33,
      email: "rodolfo@gmail.com",
    },
  ];
  return (
    <div className="container">
      <form>
        <h1>Cadastro Usuários</h1>
        <input placeholder="Nome 👤" name="nome" type="text" />
        <input placeholder="Idade " name="idade" type="number" />
        <input placeholder="Email 📧" name="email" type="email" />
        <button type="button">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <button>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
