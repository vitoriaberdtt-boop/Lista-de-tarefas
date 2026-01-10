import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/Todo.jsx'
import TodoForm from './components/TodoForm.jsx'
import Search from './components/Search.jsx'
import Filter from './components/Filter'


function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Estudar React', 
      category: 'Estudos',
      isCompleted: false 
    },
    { id: 2, text: 'Fazer compras', 
      category: 'Pessoal',
      isCompleted: true 
    },
    { id: 3, text: 'Estudar TypeScript', 
      category: 'Estudos',
      isCompleted: false 
    },     
  ])

const [search, setSearch] = useState('');
const [filter, setFilter] = useState('all');
const [sort, setSort] = useState('AZ');

// Adicionar tarefa
const addTodo = (text, category) => {

  const newTodos = [...todos, {
    id: Math.floor(Math.random() * 10000),
    text,
    category,
    isCompleted: false,
  }]

  setTodos(newTodos);
};

// Remover tarefa
const deleteTodo = (id) => {
  const newTodos = [...todos]
  const filteredTodos = newTodos.filter((todo) => todo.id !== id ? todo : null
  );
  setTodos(filteredTodos);
}

// Completar tarefa
const completeTodo = (id) => {
  const newTodos = [...todos];
  newTodos.map((todo) => 
    todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo);
  setTodos(newTodos);
}

const filteredTodos = todos.filter((todo) => {
  if (filter === 'all') return true;
  if (filter === 'completed') return todo.isCompleted;
  if (filter === 'incomplete') return !todo.isCompleted;
  return true;
});

return (
      <div className='app'>
        <fieldset id='titulo'>
          <h1>Lista de Tarefas</h1>
        </fieldset>

      <TodoForm addTodo={addTodo} />
      

        <div className='todo-list'>
          {todos
          .filter((todo) => 
            filter === 'all' 
              ? true 
              : filter === 'completed' 
              ? todo.isCompleted 
              : !todo.isCompleted
            )
          .filter((todo) => 
            todo.text.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
          sort === 'AZ'
            ? a.text.localeCompare(b.text)
            : b.text.localeCompare(a.text)
        )
          .map((todo) => (
          <Todo key={todo.id} 
            todo={todo} 
            removeTodo={deleteTodo} 
            completeTodo={completeTodo}
            />
          ))}
        </div>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <p className="copy">&copy; Vitória Berdtt</p>
      </div>
  );
}

export default App
