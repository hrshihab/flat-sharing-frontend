"use client";
import SearchField from "@/components/UI/HomePage/SearchBar/SearchBar";
import { useGetFlatPostsQuery } from "@/redux/api/flatApi";
import { Box, Container } from "@mui/material";
import React, { useState } from "react";

const AllFlats = () => {
  return (
    <Box sx={{ mt: { lg: "20px" } }}>
      <SearchField params={20} />
    </Box>
  );
};

export default AllFlats;
