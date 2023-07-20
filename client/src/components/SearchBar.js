import React from "react";
import TextField from "@mui/material/TextField"; // Import the TextField component from Material-UI

const SearchBar = ({ search, handleSearch }) => {
  return (
    <div>
      {/* Pretty Material-UI TextField */}
      <TextField
        variant="outlined"
        size="small"
        label="Search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
    </div>
  );
};

export default SearchBar;
