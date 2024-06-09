"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import FlatCard from "../FlatCard/FlatCard";

const SearchField = ({ params }: { params: number }) => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      location: "",
      bedrooms: "",
      priceMin: 0,
      priceMax: 15000,
      limit: params,
    },
  });

  const [searchData, setSearchData] = React.useState({
    location: "",
    bedrooms: "",
    priceMin: 0,
    priceMax: 15000,
    limit: params | 6,
  });

  const onSubmit = (data: any) => {
    setSearchData(data);
    //console.log(data);
  };

  return (
    <Box
      id="search-flat"
      sx={{
        backgroundColor: "#fff",
        margin: "0 auto",
        maxWidth: 1200,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "24px", md: "30px" },
            fontWeight: "600",
            color: "primary.main",
            marginTop: "50px",
            boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.05)",
            padding: "10px 20px",
            borderRadius: "20px 20px ",
          }}
        >
          Filter Your Perfect Flat
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-around",
            padding: "30px",
            gap: { xs: 2, md: 0 },
            borderRadius: 15,
            boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Search Flat Location */}
          <Box
            sx={{
              minWidth: 120,
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Typography my={2}>Search Flat Location</Typography>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Search location"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </Box>

          {/* Select number of bedroom selector */}
          <Box sx={{ minWidth: 120, width: { xs: "100%", md: "auto" } }}>
            <Typography my={2}>Choose number of Bedrooms</Typography>
            <FormControl fullWidth>
              <InputLabel id="bedroom-select-label">Bedrooms</InputLabel>
              <Controller
                name="bedrooms"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="bedroom-select-label"
                    label="Bedrooms"
                  >
                    {/* Add an "any" option */}
                    <MenuItem value="">Any</MenuItem>
                    {/* Generate options for number of bedrooms */}
                    {Array.from({ length: 10 }, (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          {/* Price range selector */}
          <Box sx={{ width: { xs: "100%", md: 300 } }}>
            <Typography my={2}>Choose Price Range</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="priceMin"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Min Price"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="priceMax"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Max Price"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                )}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button variant="contained" color="primary" type="submit">
            Apply Filters
          </Button>
        </Box>
      </form>

      <FlatCard searchData={searchData}></FlatCard>
    </Box>
  );
};

export default SearchField;
