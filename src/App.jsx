import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!task) return;
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTask("");
  };

  // Update todo
  const updateTodo = async (id) => {
    const newTask = prompt("Update task:");
    if (!newTask) return;
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask })
    });
    const updatedTodo = await res.json();
    setTodos(todos.map(t => (t._id === id ? updatedTodo : t)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Simple MERN CRUD by IROSH</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="New task"
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md">
        {todos.map(todo => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-white rounded shadow p-3 mb-2"
          >
            <span>{todo.task}</span>
            <div>
              <button
                onClick={() => updateTodo(todo._id)}
                className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
