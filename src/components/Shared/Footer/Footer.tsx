import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";

const Footer = () => {
  return (
    <Box id="contact-us" bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center" flexWrap="wrap">
          <Typography color="#fff" component={Link} href="/#search-flat">
            Search Flat
          </Typography>
          <Typography color="#fff" component={Link} href="/#book-flat">
            Book Flat
          </Typography>
          <Typography color="#fff" component={Link} href="/dashboard">
            Advertise Flat
          </Typography>
          <Typography color="#fff" component={Link} href="/dashboard">
            Rent Flat
          </Typography>
          <Typography color="#fff" component={Link} href="/#contact-us">
            Contact Us
          </Typography>
        </Stack>

        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Link href="https://facebook.com/hrshihab2016" passHref>
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href="https://instagram.com" passHref>
            <Image src={instagramIcon} width={30} height={30} alt="instagram" />
          </Link>
          <Link href="https://twitter.com" passHref>
            <Image src={twitterIcon} width={30} height={30} alt="twitter" />
          </Link>
          <Link href="https://www.linkedin.com/in/hr-shihab/" passHref>
            <Image src={linkedIcon} width={30} height={30} alt="linkedin" />
          </Link>
        </Stack>

        <Box
          sx={{
            border: "1px dashed lightgray",
          }}
        ></Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
          textAlign={{ xs: "center", sm: "left" }}
        >
          <Typography component="p" color="white">
            &copy;2024 FLATMATE. All Rights Reserved.
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="white"
          >
            FLAT
            <Box component="span" color="primary.main">
              MATE
            </Box>
          </Typography>
          <Typography component="p" color="white">
            Privacy Policy | Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
