"use client";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import FlatShareModal from "../components/FlatShareModal";

const FlatRequestPage = ({ params }: any) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>
          Request for Booking
        </Button>
        <FlatShareModal
          params={params}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
      </Stack>
    </Box>
  );
};
export default FlatRequestPage;
