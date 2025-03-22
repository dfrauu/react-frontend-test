import React from "react";
import { TextField, MenuItem, Box, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ searchQuery, setSearchQuery, userIdFilter, setUserIdFilter, userIds }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on larger screens
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        width: "100%",
      }}
    >
      {/* Input text field for searching tasks by task number or title */}
      <TextField
        label="Search by task number or title..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ width: { xs: "100%", sm: "50%" } }}
        InputProps={{
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearchQuery("")}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Input Dropdown field for filtering tasks by User ID */}
      <TextField
        select
        label="Filter by User ID"
        variant="outlined"
        size="small"
        value={userIdFilter}
        onChange={(e) => setUserIdFilter(e.target.value)}
        sx={{ width: { xs: "100%", sm: "25%" } }}
      >
        <MenuItem value="">All Users</MenuItem>
        {userIds.map((id) => (
          <MenuItem key={id} value={id}>
            User {id}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default SearchBar;
