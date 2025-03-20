import React, { useState, useEffect, useRef } from "react";

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // state for search query
  const [filter, setFilter] = useState("all"); // state for filter selection (completed, not completed, or all)
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const breadcrumbRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setTodos(data);
        setFilteredTodos(data); // initially set filteredTodos to the full list
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    // Filter todos based on the selected filter and search query
    let filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery) || todo.id.toString().includes(searchQuery)
    );

    if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed === true);
    } else if (filter === "notCompleted") {
      filtered = filtered.filter((todo) => todo.completed === false);
    }

    setFilteredTodos(filtered);
    setCurrentPage(1); // Reset to page 1 when the filter or search changes
  }, [todos, searchQuery, filter]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery(""); // Clear the input field
  };

  // Check if the filteredTodos is empty and no results are found
  const isEmpty = filteredTodos.length === 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Todo List</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", width: "100%", maxWidth: "400px", margin: "0 auto", position: "relative" }}>
        <input
          type="text"
          placeholder="Search by task number or title..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            padding: "10px",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxSizing: "border-box", // Ensures padding and border are inside the width
          }}
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              bottom: "0",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Clear
          </button>
        )}
      </div><br></br>

      {/* Filter Buttons */}
      <div style={{ textAlign: "center", marginBottom: "20px", width: "100%", maxWidth: "400px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between", // evenly spaces the buttons
          width: "100%", // Ensures that the total width is 100% of the container
          gap: "10px", // Adds space between the buttons
        }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              flex: 1, // Makes the buttons equally spaced
              backgroundColor: filter === "all" ? "lightblue" : "transparent",
              padding: "10px 15px",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            style={{
              flex: 1, // Makes the buttons equally spaced
              backgroundColor: filter === "completed" ? "lightgreen" : "transparent",
              padding: "10px 15px",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("notCompleted")}
            style={{
              flex: 1, // Makes the buttons equally spaced
              backgroundColor: filter === "notCompleted" ? "lightcoral" : "transparent",
              padding: "10px 15px",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            Not Completed
          </button>
        </div>
      </div><br></br>

      {/* If no results found, show the message */}
      {isEmpty ? (
        <div style={{ textAlign: "center", fontSize: "1.2rem", color: "gray" }}>
          No results found. Try adjusting your search or filter.
        </div>
      ) : (
        <>
          {/* Pagination Controls at the Top */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "5px" }}>
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
          <div style={{ textAlign: "center", marginTop: "5px", fontSize: "0.75rem" }}>
            Page {currentPage} of {totalPages}
          </div><br></br>

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
        </>
      )}
    </div>
  );
};

export default TodosList;
