import React from "react";
import { Typography } from "@mui/material";
import TodoItem from "./TodoItem";

const FavoritesList = ({ favorites, toggleFavorite }) => {
  return (
    // Display the list of favorite todos implementing the TodoItem component
    <div>
      <Typography variant="h5" align="center">
        Favorites
      </Typography>

      {/* Conditional rendering based on the amount of favorite todos */}
      {favorites.length > 0 ? (
        // Display the list of favorite todos
        favorites.map((fav) => <TodoItem key={fav.id} todo={fav} toggleFavorite={toggleFavorite} favorites={favorites} />)
      ) : (
        // Displayed when NO favorite todos are found
        <Typography align="center" color="gray">
          No items have been added to Favorites yet.
        </Typography>
      )}
    </div>
  );
};

export default FavoritesList;
