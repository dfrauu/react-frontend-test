import React, { useState, useEffect, useRef } from "react";

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const breadcrumbRef = useRef(null);
  const listRef = useRef(null);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = todos.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    scrollToTop();
    scrollToActivePage(page);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToActivePage = (page) => {
    if (breadcrumbRef.current) {
      const activeElement = breadcrumbRef.current.querySelector(`[data-page='${page}']`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const changePage = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      goToPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Todo List</h2>

      {/* Pagination Controls at the Top */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
        {/* Previous Page Button */}
        <button
          onClick={() => changePage("prev")}
          disabled={currentPage === 1}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: currentPage === 1 ? "default" : "pointer",
            color: currentPage === 1 ? "gray" : "black",
            marginRight: "5px",
          }}
        >
          ◀
        </button>

        {/* Scrollable Breadcrumb Navigation */}
        <div
          ref={breadcrumbRef}
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "10px",
            maxWidth: "60%",
            scrollbarWidth: "thin",
            scrollbarColor: "gray lightgray",
            borderRadius: "10px",
            boxShadow: "inset 10px 0px 10px -10px rgba(0,0,0,0.3), inset -10px 0px 10px -10px rgba(0,0,0,0.3)",
          }}
        >
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <span
                key={page}
                data-page={page}
                onClick={() => goToPage(page)}
                style={{
                  margin: "0 8px",
                  cursor: "pointer",
                  fontWeight: currentPage === page ? "bold" : "normal",
                  textDecoration: currentPage === page ? "underline" : "none",
                  color: currentPage === page ? "blue" : "black",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  background: currentPage === page ? "lightblue" : "transparent",
                }}
              >
                {page}
              </span>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => changePage("next")}
          disabled={currentPage >= totalPages}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: currentPage >= totalPages ? "default" : "pointer",
            color: currentPage >= totalPages ? "gray" : "black",
            marginLeft: "5px",
          }}
        >
          ▶
        </button>
      </div>

      {/* Centered Pagination Info */}
      <div style={{ textAlign: "center", marginTop: "10px", fontSize: "0.75rem" }}>
        Page {currentPage} of {totalPages}
      </div>

      {/* Todo List */}
      <ul ref={listRef} style={{ listStyle: "none", padding: 0 }}>
        {paginatedTodos.map((todo) => (
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
