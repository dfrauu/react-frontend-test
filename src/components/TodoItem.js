import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// Component to display individual todo items with an active favorite toggle button
const TodoItem = ({ todo, toggleFavorite, favorites }) => {
  const isFavorite = favorites.some((fav) => fav.id === todo.id);

return (
    // Display the todo item encased in a box with a background color based on completion status
    <Card sx={{ margin: "10px 0", backgroundColor: todo.completed ? "#d4edda" : "#f8d7da" }}>
        <CardContent sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            {/* Display the todo item's completion status using a checkmark or cross icon as redundancy to the background color */}
            <Typography sx={{ marginRight: "10px" }}>
                {todo.completed ? "✔️" : "❌"} 
            </Typography>
            {/* The main element of every todo item, displaying the todo's item number and text content*/}
            <Typography 
                sx={{ 
                    flexGrow: 1, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "flex-start" 
                }}
            >
                <span>{todo.id}. {todo.title}</span>
            </Typography>
            {/* Separator line to distinguish the todo item's content from the user ID and favorite button */}
            <div 
                style={{ 
                    width: "1px", 
                    backgroundColor: "#ccc", 
                    height: "100%", 
                    margin: "0 2.5px" 
                }} 
            />
            {/* Display the todo item's user ID */}
            <Typography 
                sx={{ 
                    color: "#666",
                    marginLeft: "auto", 
                    marginRight: "10px", 
                    whiteSpace: "nowrap", 
                    textAlign: "center", 
                    flexShrink: 0 
                }}
            >
                <b>User ID: <br/>{todo.userId}</b>
            </Typography>
            {/* Favorite toggle button to add or remove the todo item from the favorites list
                Actively toggles between a filled and outlined star icon based on the todo item's favorite status */}
            <IconButton onClick={() => toggleFavorite(todo)}>
                {isFavorite ? <StarIcon sx={{ color: "red" }} /> : <StarBorderIcon />}
            </IconButton>
        </CardContent>
    </Card>
);
};

export default TodoItem;
