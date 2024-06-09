"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import assets from "@/assets";
import chooseUsImg from "@/assets/svgs/why.jpg";
import Image from "next/image";

const servicesData = [
  {
    imageSrc: assets.svgs.award,
    title: "Verified Listings",
    description:
      "All flats are verified by our team to ensure you get what you see. No more surprises!",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Affordable Prices",
    description:
      "We offer the best prices in the market with no hidden charges. Flat sharing made easy and affordable.",
  },
  {
    imageSrc: assets.svgs.award,
    title: "Fully Furnished Flats",
    description:
      "Our flats come with all the necessary amenities and furniture so you can move in hassle-free.",
  },
  {
    imageSrc: assets.svgs.award,
    title: "24/7 Customer Support",
    description:
      "Our dedicated team is available around the clock to assist you with any queries or issues.",
  },
];

const WhyUs = () => {
  return (
    <Container id="why-us">
      <Box my={10}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            color="primary"
            variant="h6"
            component="h1"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Why Us
          </Typography>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Why Choose Us
          </Typography>
        </Box>
        <Grid container spacing={4} my={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {servicesData.map((service, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "15px",
                      backgroundColor: "rgba(245, 245, 245,1)",
                      padding: "15px",
                      alignItems: "center",
                      borderRadius: "10px",
                      textAlign: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={service.imageSrc}
                        width={50}
                        height={50}
                        alt={service.title}
                      />
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        fontWeight={600}
                      >
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={chooseUsImg} width={400} alt="choose us" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhyUs;
