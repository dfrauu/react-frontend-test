// For fetching data from an API and displays a list of todos.
import React, { useState, useEffect } from "react";
// For implementation of MaterialUI components.
import { Container, Typography } from "@mui/material";
// For List management components.
import SearchBar from "./SearchBar";
import FilterButtons from "./FilterButtons";
import Pagination from "./Pagination";
import TodoItem from "./TodoItem";
import FavoritesList from "./FavoritesList";

// Functional component for displaying a list of todos.
const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userIdFilter, setUserIdFilter] = useState(""); // Stores selected user ID filter
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  // Function to fetch list items from the provided API.
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

  // Extract unique user IDs for the dropdown filter.
  const userIds = [...new Set(todos.map((todo) => todo.userId))].sort((a, b) => a - b);

  // Filter and format todos based on search query and filter settings.
  useEffect(() => {
    let filtered = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.id.toString().includes(searchQuery)
    );

    // Filter based on completion status
    if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (filter === "notCompleted") {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    // Filter based on user ID
    if (userIdFilter !== "") {
      filtered = filtered.filter((todo) => todo.userId === Number(userIdFilter));
    }

    setFilteredTodos(filtered);
    setCurrentPage(1);
  }, [todos, searchQuery, filter, userIdFilter]);

  // Variables for paginating todos based on current page and items per page.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

  // Function to toggle favorite status of a todo item.
  const toggleFavorite = (todo) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === todo.id)
        ? prevFavorites.filter((fav) => fav.id !== todo.id)
        : [...prevFavorites, todo]
    );
  };

  // Body of the page, implements all components.
  return (
    <Container sx={{ padding: "20px", fontFamily: "Arial" }}>
      <Typography variant="h4" align="center">
        Todo List
      </Typography><br/>

      {/* Implement SearchBar with User ID filter */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userIdFilter={userIdFilter}
        setUserIdFilter={setUserIdFilter}
        userIds={userIds}
      />
      <FilterButtons filter={filter} setFilter={setFilter} />

      {/* Conditional rendering based on the amount of filtered todos */}
      {filteredTodos.length === 0 ? (
        // Displayed when NO results are found
        <Typography align="center" color="gray" sx={{ fontSize: "1.2rem" }}>
          No results found.
        </Typography>
      ) : (
        // Displayed when results are found
        <>
          {/* Implement responsive Pagination component */}
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          
          {/* Display list implementing TodoItem component */}
          {paginatedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleFavorite={toggleFavorite} favorites={favorites} />
          ))}
        </>
      )}
      <br />
      <FavoritesList favorites={favorites} toggleFavorite={toggleFavorite} />
    </Container>
  );
};

export default TodosList;
