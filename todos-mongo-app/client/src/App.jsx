import React, { useEffect, useState } from "react";
import API from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await API.get("/"); // GET /todos
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err.response?.data || err.message);
    }
  };

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      // ✅ Use "title" instead of "text"
      await API.post("/", { title: newTodo }); 
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err.response?.data || err.message);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await API.delete(`/${id}`); // DELETE /todos/:id
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white px-6 py-10">
      <div className="w-full max-w-3xl bg-zinc-950/90 border border-zinc-800 rounded-3xl shadow-2xl p-10 backdrop-blur-sm">
        {/* Title */}
        <h1 className="text-6xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg mb-12">
          🚀 Todo App
        </h1>

        {/* Add Form */}
        <form onSubmit={addTodo} className="flex gap-4 mb-12">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="✍️ Add a new task..."
            className="flex-grow px-5 py-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-lg text-white shadow-inner focus:ring-4 focus:ring-indigo-500 focus:border-indigo-400 outline-none transition"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:scale-105 hover:shadow-indigo-500/50 transition-transform"
          >
            ➕ Add
          </button>
        </form>

        {/* Todo List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {todos.length === 0 ? (
            <p className="text-gray-400 text-center text-lg italic">
              No todos yet 🙌
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex justify-between items-center bg-zinc-900 border border-zinc-700 p-5 rounded-2xl shadow-md hover:shadow-lg hover:border-indigo-500 transition"
              >
                {/* ✅ Use title instead of text */}
                <span className="text-gray-200 text-lg font-medium">
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-red-500/40 transition-transform"
                >
                  🗑 Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
