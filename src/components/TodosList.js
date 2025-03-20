import React, { useState, useEffect } from "react";

const TodosList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Todo List</h2>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "10px",
              margin: "5px 0",
              background: todo.completed ? "#d4edda" : "#f8d7da",
              border: "1px solid #ccc",
            }}
          >
            {todo.id}. {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosList;
