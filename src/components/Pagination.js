import React, { useRef, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const breadcrumbRef = useRef(null);

  // Within the breadcrumb element, scroll to the selected page when the currentPage changes
  useEffect(() => {
    if (breadcrumbRef.current) {
      const selectedPage = breadcrumbRef.current.querySelector(`[data-page="${currentPage}"]`);
      if (selectedPage) {
        selectedPage.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [currentPage]);

  // Function to change the current page based on the direction of the arrow button clicked
  const changePage = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "prev" && prev > 1) return prev - 1;
      if (direction === "next" && prev < totalPages) return prev + 1;
      return prev;
    });
  };

  // Scrollable pagination component with breadcrumbs and arrow buttons
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%", // Prevents overflow
        overflow: "hidden",
        my: 2,
      }}
    >
      {/* Pagination Controls */}
      <Box display="flex" alignItems="center">
        {/* Previous Button */}
        <IconButton onClick={() => changePage("prev")} disabled={currentPage === 1}>
          <ArrowBackIosIcon color={currentPage === 1 ? "disabled" : "primary"} />
        </IconButton>

        {/* Scrollable Page Numbers */}
        <Box
          ref={breadcrumbRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "10px",
            borderRadius: "15px",
            maxWidth: "80vw", // Prevents horizontal overflow
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { height: "5px" },
            "&::-webkit-scrollbar-thumb": { background: "gray", borderRadius: "5px" },
            boxShadow: "inset 5px 0 10px -5px rgba(0, 0, 0, 0.2), inset -5px 0 10px -5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <Typography
                key={page}
                data-page={page}
                onClick={() => setCurrentPage(page)}
                sx={{
                  mx: 1,
                  cursor: "pointer",
                  fontWeight: currentPage === page ? "bold" : "normal",
                  textDecoration: currentPage === page ? "underline" : "none",
                  color: currentPage === page ? "primary.main" : "text.primary",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  "&:hover": { color: "primary.dark" },
                }}
              >
                {page}
              </Typography>
            );
          })}
        </Box>

        {/* Next Button */}
        <IconButton onClick={() => changePage("next")} disabled={currentPage === totalPages}>
          <ArrowForwardIosIcon color={currentPage === totalPages ? "disabled" : "primary"} />
        </IconButton>
      </Box>

      {/* Page Indicator: "Page X of Y" (inside the container, below the pagination bar) */}
      <Typography sx={{ fontSize: "0.85rem", color: "gray", mt: 1 }}>
        Page {currentPage} of {totalPages}
      </Typography>
    </Box>
  );
};

export default Pagination;
