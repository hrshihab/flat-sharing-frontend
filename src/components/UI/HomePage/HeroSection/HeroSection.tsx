"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets"; // Ensure this import path is correct
import Link from "next/link";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        mt: { xs: 12, md: 13 },
        mb: { xs: 8, md: 6 },

        mx: "auto",
        //left: 0,
        right: 0,
        boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,

        borderRadius: 22,
        //mt: { xs: 14, sm: 20 },
        bb: { xs: 8, sm: 12 },
        width: { xs: "100%", lg: "80%", xl: "60%" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: { sm: "center", xs: "center", lg: "left" },
          px: { xs: 0, md: 4 },
          py: { xs: 4, md: 0 },

          boxShadow: {
            xs: "0px 4px 3px rgba(0, 0, 0, 0.05)",
            md: "0px 4px 3px rgba(0, 0, 0, 0.0)",
          },
          borderRadius: 15,
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          fontWeight={600}
          sx={{ fontSize: { xs: "2rem", md: "2rem", lg: "3rem" } }}
        >
          Find Your Perfect
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          sx={{ fontSize: { xs: "2rem", md: "2rem", lg: "3rem" } }}
        >
          Flat Today
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          color="primary.main"
          sx={{ fontSize: { xs: "2rem", md: "2rem", lg: "3rem" } }}
        >
          Easy & Fast
        </Typography>
        <Typography
          sx={{
            my: 4,
            width: "80%",
            fontSize: { xs: "1rem", md: "1.25rem" },
            textAlign: "justify",
            mx: { sm: "auto", xs: "auto", lg: "0" },
          }}
        >
          Discover thousands of flatshare options, meet your ideal flatmates,
          and enjoy comfortable living . Start your search now!
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Link href={`/dashboard`}>
            <Button
              variant="contained"
              sx={{ color: "#ffff", fontStyle: "bold" }}
            >
              Share Your Flat
            </Button>
          </Link>

          <Link href="/#contact-us">
            <Button variant="outlined">Contact Us</Button>
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          mt: { xs: 4, md: 0 },
          position: "relative",
        }}
      >
        <Box>
          <Image
            src={
              assets.images.flat4 ||
              "https://res.cloudinary.com/ddqr8la1c/image/upload/v1718021144/bed_dz0bwa.png"
            }
            width={700}
            height={700}
            alt="Flat Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
