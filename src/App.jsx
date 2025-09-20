// App.js
import { useState, useEffect } from "react";
import React from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Fetch todos
  useEffect(() => {
    fetch("http://localhost:5001/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add todo
  const addTodo = () => {
    if (!task) return;
    fetch("http://localhost:5001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    })
      .then(res => res.json())
      .then(newTodo => setTodos([...todos, newTodo]));
    setTask("");
  };

  // Toggle
  const toggleTodo = (id, completed) => {
    fetch(`http://localhost:5001/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(res => res.json())
      .then(updated => setTodos(todos.map(t => t._id === id ? updated : t)));
  };

  // Delete
  const deleteTodo = (id) => {
    fetch(`http://localhost:5001/api/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter(t => t._id !== id)));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">My To-Do App</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="New task"
          className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-96 bg-white shadow-lg rounded-lg p-4 space-y-2">
        {todos.map(todo => (
          <li
            key={todo._id}
            className="flex justify-between items-center p-2 border-b last:border-none"
          >
            <span
              onClick={() => toggleTodo(todo._id, todo.completed)}
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
