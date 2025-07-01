
'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const handleAdd = async () => {
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ task }),
    });
    setTask('');
    fetchTodos();
  };

  const handleToggle = async (todo) => {
    await fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...todo, done: !todo.done }),
    });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Todo App</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 mr-2"
        placeholder="New task"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2">
        Add
      </button>

      <ul className="mt-6">
        {todos.map((todo) => (
          <li key={todo._id} className="mb-2">
            <span
              className={`mr-4 ${todo.done ? 'line-through text-gray-500' : ''}`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => handleToggle(todo)}
              className="text-green-600 mr-2"
            >
              {todo.done ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => handleDelete(todo._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
