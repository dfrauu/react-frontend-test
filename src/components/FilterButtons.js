import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const FilterButtons = ({ filter, setFilter }) => {
return (
    // Set of buttons for filtering todos based on completion status.
    <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
        sx={{ display: "flex", justifyContent: "center", my: 2, borderRadius: "25px" }}
    >
        <ToggleButton value="all" sx={{ flex: 1, maxWidth: "150px" }}>All</ToggleButton>
        <ToggleButton value="completed" sx={{ flex: 1, maxWidth: "150px" }}>Completed</ToggleButton>
        <ToggleButton value="notCompleted" sx={{ flex: 1, maxWidth: "150px" }}>Not Completed</ToggleButton>
    </ToggleButtonGroup>
);
};

export default FilterButtons;
