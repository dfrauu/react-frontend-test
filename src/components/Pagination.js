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
    <Box display="flex" justifyContent="center" alignItems="center" my={2}>
      {/* Previous Button */}
      <IconButton onClick={() => changePage("prev")} disabled={currentPage === 1}>
        <ArrowBackIosIcon color={currentPage === 1 ? "disabled" : "primary"} />
      </IconButton>

      {/* Scrollable Breadcrumb Navigation Element */}
      <Box
        ref={breadcrumbRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "10px",
          maxWidth: "60%",
          borderRadius: "15px",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { height: "5px" },
          "&::-webkit-scrollbar-thumb": { background: "gray", borderRadius: "5px" },
          boxShadow: "inset 5px 0 10px -5px rgba(0, 0, 0, 0.2), inset -5px 0 10px -5px rgba(0, 0, 0, 0.2)", // Box shadow for left and right edges
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
  );
};

export default Pagination;
