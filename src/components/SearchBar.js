import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";


const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    // Input text field for searching by tasks by task number or title
    <TextField
      fullWidth
      label="Search by task number or title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      variant="outlined"
      margin="normal"
      InputProps={{
        endAdornment: searchQuery && (
          <InputAdornment position="end">
            <IconButton onClick={() => setSearchQuery("")}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
