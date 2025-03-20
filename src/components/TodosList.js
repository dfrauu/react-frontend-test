import React, { useState, useEffect, useRef } from "react";

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [favorites, setFavorites] = useState([]); // State to store favorites
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filter, setFilter] = useState("all");
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
        setFilteredTodos(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    let filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery) || todo.id.toString().includes(searchQuery)
    );

    if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed === true);
    } else if (filter === "notCompleted") {
      filtered = filtered.filter((todo) => todo.completed === false);
    }

    setFilteredTodos(filtered);
    setCurrentPage(1);
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

  const isEmpty = filteredTodos.length === 0;

  // Function to add or remove todo from favorites
  const toggleFavorite = (todo) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === todo.id)) {
        return prevFavorites.filter((fav) => fav.id !== todo.id); // Remove from favorites
      } else {
        return [...prevFavorites, todo]; // Add to favorites
      }
    });
  };

  // Function to remove todo from favorites directly from the favorites section
  const removeFromFavorites = (todo) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== todo.id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <style>
        {`
          /* Default max-width to 100% */
          .todos-container, .favorites-container {
            max-width: 100%;
            margin: 0 auto;
          }

          /* For screens wider than 768px (desktop screens) */
          @media (min-width: 768px) {
            .todos-container, .favorites-container {
              max-width: 80%;
            }
          }
        `}
      </style>

      <h2 style={{ textAlign: "center" }}>Todo List</h2>

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
            boxSizing: "border-box",
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
          justifyContent: "space-between",
          width: "100%",
          gap: "10px",
        }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              flex: 1,
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
              flex: 1,
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
              flex: 1,
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
                    }}
                  >
                    {page}
                  </span>
                );
              })}
            </div>

            <button
              onClick={() => changePage("next")}
              disabled={currentPage === totalPages}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: currentPage === totalPages ? "default" : "pointer",
                color: currentPage === totalPages ? "gray" : "black",
                marginLeft: "5px",
              }}
            >
              ▶
            </button>
          </div>

          {/* Todo List */}
          <div ref={listRef}>
            <div className="todos-container" style={{ margin: "0 auto", maxWidth: "90%" }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {paginatedTodos.map((todo) => (
                  <li
                    key={todo.id}
                    style={{
                      padding: "10px",
                      margin: "5px 0",
                      backgroundColor: todo.completed ? "#d4edda" : "#f8d7da", // Maintain original color
                      border: favorites.some((fav) => fav.id === todo.id)
                        ? "2px solid #007bff" // Add a border to favorites
                        : "none",
                      boxShadow: favorites.some((fav) => fav.id === todo.id)
                        ? "0 0 10px rgba(0, 123, 255, 0.5)" // Light blue shadow for favorites
                        : "none",
                      display: "flex",
                      justifyContent: "space-between", // Aligns title and button
                      flexWrap: "wrap", // Ensures wrapping if text overflows
                      alignItems: "center",
                    }}
                  >
                    <span style={{ flex: 1, wordWrap: "break-word" }}>{todo.title}</span>
                    <div>
                      <button
                        onClick={() => toggleFavorite(todo)}
                        style={{
                          marginLeft: "10px",
                          backgroundColor: favorites.some((fav) => fav.id === todo.id)
                            ? "red"
                            : "#007bff",
                          color: "white",
                          border: "none",
                          padding: "5px",
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                      >
                        {favorites.some((fav) => fav.id === todo.id) ? "Remove from Favorites" : "Add to Favorites"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Favorites Section */}
      <div>
        <h3 style={{ textAlign: "center" }}>Favorites</h3>
        <div className="favorites-container" style={{ margin: "0 auto", maxWidth: "90%" }}>
          {favorites.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {favorites.map((fav) => (
                <li
                  key={fav.id}
                  style={{
                    padding: "10px",
                    margin: "5px 0",
                    backgroundColor: fav.completed ? "#d4edda" : "#f8d7da", // Maintain original color
                    border: "2px solid #007bff", // Highlight favorites with a border
                    boxShadow: "0 0 10px rgba(0, 123, 255, 0.5)", // Light blue shadow for favorites
                    display: "flex",
                    justifyContent: "space-between", // Aligns title and button
                    flexWrap: "wrap", // Ensures wrapping if text overflows
                    alignItems: "center",
                  }}
                >
                  <span style={{ flex: 1, wordWrap: "break-word" }}>{fav.title}</span>
                  <div>
                    <button
                      onClick={() => removeFromFavorites(fav)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", fontSize: "1rem", color: "gray" }}>
              No items have been added to Favorites yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodosList;
