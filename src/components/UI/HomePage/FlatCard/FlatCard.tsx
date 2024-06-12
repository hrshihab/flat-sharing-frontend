"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DetailsIcon from "@mui/icons-material/Details";
import { useGetFlatPostsQuery } from "@/redux/api/flatApi";
import Link from "next/link";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import FlatCardSkeleton from "../../Skeleton/FlatCardSkeleton";
import FlatShareModal from "@/app/(withCommonLayout)/flatShareRequest/components/FlatShareModal";

export default function FlatCard({ searchData }: { searchData: any }) {
  // const query: Record<string, any> = {};
  // //const [searchTerm, setSearchTerm] = useState<string>("");

  // const debouncedTerm = useDebounced({
  //   searchQuery: searchData,
  //   delay: 600,
  // });
  // if (!!debouncedTerm) {
  //   query["searchTerm"] = searchData;
  // }
  // console.log(query);
  //console.log(searchData);
  const { data, isLoading } = useGetFlatPostsQuery(searchData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box id="book-flat" sx={{ mt: 10, mb: 2 }}>
      <Container sx={{ margin: "30px auto" }}>
        {isLoading ? (
          <FlatCardSkeleton />
        ) : (
          <>
            <Grid container spacing={4}>
              {data?.map((flat: any) => (
                <Grid item key={flat.id} md={4}>
                  <Card
                    sx={{
                      height: 450,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Box
                      sx={{
                        height: 200,
                        overflow: "hidden",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    >
                      <Image
                        src={
                          flat?.photos[0]
                            ? flat.photos[0]
                            : "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg"
                        }
                        alt={flat.location}
                        width={500}
                        height={200}
                        objectFit="cover"
                      />
                    </Box>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {flat.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: "#FF5733" }}
                      >
                        Rent: ${flat.rentAmount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bedrooms: {flat.bedrooms}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {flat.description.length > 100
                          ? `${flat.description.substring(0, 80)}...`
                          : flat.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        px: 2,
                        paddingBottom: "20px",
                      }}
                    >
                      <Button
                        //onClick={() => setIsModalOpen(true)}
                        variant="contained"
                        sx={{ color: "#fff" }}
                      >
                        Book !
                      </Button>
                      <FlatShareModal
                        params={flat?.id}
                        open={isModalOpen}
                        setOpen={setIsModalOpen}
                      />
                      <Link
                        href={`/flatDetails/${flat.id}`}
                        passHref
                        legacyBehavior
                      >
                        <Button variant="outlined">Details</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
