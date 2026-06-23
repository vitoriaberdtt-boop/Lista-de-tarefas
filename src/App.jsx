import { useLocalStorage } from './utils/useLocalStorage.js'
import { useState } from 'react'
import { useTheme } from './context/ThemeContext.jsx'
import './App.css'
import Todo from './components/Todo.jsx'
import TodoForm from './components/TodoForm.jsx'
import Search from './components/Search.jsx'
import Filter from './components/Filter'


function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('AZ');
  const { theme, toggleTheme } = useTheme();

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
          <h1>Gerenciador de Tarefas</h1>
          <button onClick={toggleTheme} className='theme-btn'>
            {theme === 'light' ? '⏾' : '☀'}
          </button>
        </fieldset>
        

      <TodoForm addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <Search search={search} setSearch={setSearch} />
      
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
      
      <p className="copy">&copy; Vitória Berdtt</p>
      </div>
  );
}

export default App
