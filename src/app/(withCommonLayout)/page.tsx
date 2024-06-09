import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import SearchField from "@/components/UI/HomePage/SearchBar/SearchBar";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";
import { Box, Button, Divider } from "@mui/material";
import AboutPage from "./about/page";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SearchField params={6} />
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Link href={"/allflats"}>
          <Button variant="outlined">More Flats</Button>
        </Link>
      </Box>
      <HowItWorks />
      <WhyUs />
    </>
  );
};

export default HomePage;
