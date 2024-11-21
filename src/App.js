import { useState, useEffect } from 'react';
import './App.css';

function Tarefa({ tarefa, onToggle }) {
  return (
    <li>
      <input type="checkbox" checked={tarefa.concluida} onChange={() => onToggle(tarefa.id)} />
      <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
        {tarefa.texto}
      </span>
    </li>
  );
}

function ListarTarefa({ tarefas, adicionarTarefa, onToggle }) {
  return (
    <ul>
      {tarefas.map(tarefa => (
        <Tarefa key={tarefa.id} tarefa={tarefa} onToggle={onToggle} />
      ))}
    </ul>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    // Buscar tarefas de uma API (substitua por sua lógica de persistência)
    // fetch('/api/tarefas')
    //   .then(response => response.json())
    //   .then(data => setTarefas(data));
  }, []);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, novaTarefa]);
  };

  const marcarComoConcluida = (id) => {
    setTarefas(tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    }));
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const novaTarefa = {
          id: Date.now(), // Gera um ID único
          texto: event.target.tarefa.value,
          concluida: false,
        };
        adicionarTarefa(novaTarefa);
        event.target.reset();
      }}>
        <input type="text" name="tarefa" placeholder="Nova tarefa" />
        <button type="submit">Adicionar</button>
      </form>
      <ListarTarefa tarefas={tarefas} adicionarTarefa={adicionarTarefa} onToggle={marcarComoConcluida} />
    </div>
  );
}

export default App;