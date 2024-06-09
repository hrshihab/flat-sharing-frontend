"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import femaleDocImg from "@/assets/how.png";
import searchIcon from "@/assets/icons/search-icon.png";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import appointmentIcon from "@/assets/icons/appointment-icon.png";
import charityIcon from "@/assets/icons/charity-icon.png";

const HowItWorks = () => {
  return (
    <Container>
      <Box my={10}>
        <Box textAlign="center">
          <Typography
            component="p"
            fontSize={20}
            fontWeight={400}
            color="#1586FD"
            sx={{ mb: 1.3 }}
          >
            How it Works
          </Typography>
          <Typography variant="h4" component="h1" fontWeight={600}>
            4 Easy Steps to Rent Your Flat
          </Typography>
          <Typography
            component="p"
            fontSize={18}
            fontWeight={400}
            sx={{ mt: 2 }}
          >
            Discover how easy it is to find and rent your ideal flat.
          </Typography>
        </Box>
        <Box mt={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} textAlign="center">
              <Image
                src={femaleDocImg}
                alt="flat image"
                style={{ width: "90%", height: "80%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Image src={searchIcon} alt="search-icon" />
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={500}
                      mt={3}
                    >
                      Search the Flat
                    </Typography>
                    <Typography
                      component="p"
                      fontSize={14}
                      fontWeight={400}
                      sx={{ mt: 1 }}
                    >
                      Easily search for flats based on location, rent, and
                      bedrooms.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Image src={doctorIcon} alt="doctor-icon" />
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={500}
                      mt={3}
                    >
                      Book the Flat
                    </Typography>
                    <Typography
                      component="p"
                      fontSize={14}
                      fontWeight={400}
                      sx={{ mt: 1 }}
                    >
                      Schedule a viewing or book the flat directly through our
                      platform.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Image src={appointmentIcon} alt="appointment-icon" />
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={500}
                      mt={3}
                    >
                      Advertise Your Flat
                    </Typography>
                    <Typography
                      component="p"
                      fontSize={14}
                      fontWeight={400}
                      sx={{ mt: 1 }}
                    >
                      List your flat on our platform to reach a wide audience of
                      potential .
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Image src={charityIcon} alt="charity-icon" />
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={500}
                      mt={3}
                    >
                      Rent the Flat
                    </Typography>
                    <Typography
                      component="p"
                      fontSize={14}
                      fontWeight={400}
                      sx={{ mt: 1 }}
                    >
                      Complete the rental process easily and move into your new
                      home.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default HowItWorks;
