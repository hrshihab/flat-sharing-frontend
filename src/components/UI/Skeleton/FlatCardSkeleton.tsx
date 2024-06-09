import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";

const data: any = [];

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(3)) : data).map(
        (item: any, index: any) => (
          <Box key={index} sx={{ width: 300, marginRight: 1, my: 5 }}>
            {item ? (
              <Image
                style={{ width: 210, height: 118 }}
                alt={item.title}
                src={item.src}
              />
            ) : (
              <Skeleton variant="rectangular" width={300} height={200} />
            )}
            {item ? (
              <Box sx={{ pr: 2 }}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography
                  display="block"
                  variant="caption"
                  color="text.secondary"
                >
                  {item.channel}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`${item.views} • ${item.createdAt}`}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="100%" />
              </Box>
            )}
          </Box>
        )
      )}
    </Grid>
  );
}

export default function FlatCardSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Align horizontally to the center
        alignItems: "center", // Align vertically to the center
        //height: '100vh', // Adjust height as needed
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Media loading />
        <Media />
      </Box>
    </Box>
  );
}
