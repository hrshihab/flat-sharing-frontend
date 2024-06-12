"use client";

import { useGetSingleFlatQuery } from "@/redux/api/flatApi";
import React, { useState } from "react";

import Link from "next/link";
import FlatShareModal from "../../flatShareRequest/components/FlatShareModal";
import {
  Box,
  IconButton,
  Paper,
  Button,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActions,
  Divider,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";

const FlatDetailsPage = ({ params }: any) => {
  //console.log("params", params);
  const { data, isLoading, error } = useGetSingleFlatQuery(params.flatId);
  //console.log("data", data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <Typography
        variant="body1"
        sx={{
          height: "100vh",
          color: "primary.main",
          fontWeight: "600",
          fontSize: "30px",
          textAlign: "center",
          margin: "50px auto",
        }}
      >
        Loading flat details...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="body1"
        color="error"
        sx={{
          height: "100vh",
          color: "red",
          fontWeight: "600",
          fontSize: "30px",
          textAlign: "center",
          margin: "50px auto",
        }}
      >
        Error fetching flat details.
      </Typography>
    );
  }

  const flat = data;
  const photos = flat?.photos || [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  return (
    <Box
      sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 2 }}
    >
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {photos.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                color: "primary.main",
                position: "absolute",
                left: 8,
                zIndex: 1,
                backgroundColor: "rgba(255,255,255,0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                },
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                color: "primary.main",
                position: "absolute",
                right: 8,
                zIndex: 1,
                backgroundColor: "rgba(255,255,255,0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                },
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </>
        )}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "400px",
            overflow: "hidden",
          }}
        >
          <Image
            src={flat?.photos[currentIndex]}
            alt={`Flat image ${currentIndex + 1}`}
            layout="intrinsic"
            width={800}
            height={400}
            style={{ borderRadius: "16px" }}
          />
        </Box>
      </Paper>

      <Card
        variant="outlined"
        sx={{
          maxWidth: "100%",
          borderRadius: 6,
          my: 2,
          boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack sx={{ alignItems: "start" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <FmdGoodOutlinedIcon
                  sx={{ color: "primary.main", fontSize: "30px" }}
                />
                {flat?.location}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <KingBedOutlinedIcon
                  sx={{ fontSize: "30px", color: "primary.main" }}
                />
                {flat?.bedrooms} bedrooms
              </Typography>
            </Stack>

            <Typography gutterBottom variant="h4" component="div" pr="20px">
              <AttachMoneyOutlinedIcon
                sx={{ color: "primary.main", size: "30px" }}
              />
              {flat?.rentAmount}
            </Typography>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Typography
            color="text.secondary"
            variant="caption"
            sx={{
              fontSize: "16px",
              fontStyle: "oblique",
              textAlign: "justify",
              mt: 2,
              py: 3,
            }}
          >
            {flat?.description}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h5">
            Amenities
          </Typography>
          <Stack direction="row" spacing={1}>
            {flat?.amenities.map((amenity: string, index: number) => (
              <Chip key={index} label={amenity} size="small" />
            ))}

            {/* <Chip color="primary" label="Soft" size="small" />
            <Chip label="Medium" size="small" />
            <Chip label="Hard" size="small" /> */}
          </Stack>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsModalOpen(true)}
          sx={{
            my: 2,
            mx: "auto",
            display: "block",
            color: "primary.main",
          }}
        >
          Flat Share Request
        </Button>
        <FlatShareModal
          params={params}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
      </Card>
    </Box>
  );
};

export default FlatDetailsPage;
