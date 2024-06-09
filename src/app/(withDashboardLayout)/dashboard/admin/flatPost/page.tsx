"use client";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SPInput from "@/components/Forms/SPInput";
import SPForm from "@/components/Forms/SPForm";
import { FieldValues } from "react-hook-form";
import { useFlatPostMutation } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";
import SPFileUploader from "@/components/Forms/SPFileUploader";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";

const createFlatSchema = z.object({
  location: z.string({
    required_error: "Location is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  rentAmount: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number()
      .min(0, { message: "Rent amount must be greater than or equal to 0!" })
  ),
  bedrooms: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().min(1, { message: "Bedrooms must be a positive integer!" })
  ),
  amenities: z.string({
    required_error: "Minimum 1 amenity is required!",
  }),
  file: z.any(),
});

type FlatFormValues = z.infer<typeof createFlatSchema>;

const defaultFlatValues: FlatFormValues = {
  location: "",
  description: "",
  rentAmount: 1000,
  bedrooms: 2,
  amenities: "",
  file: [],
};

const PostFlat = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [postFlat, { isLoading }] = useFlatPostMutation();

  const handleFlatPost = async (values: FieldValues) => {
    //console.log(values, "values");

    const data = modifyPayload(values);
    //console.log(data, "data");

    try {
      const res = await postFlat(data).unwrap();
      // console.log(res, "res");
      if (res?.id) {
        toast.success("Flat created successfully!!");
        //router.push("/flats");
      }
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <Box sx={{ width: { md: "80%" }, mx: "auto" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        CREATE FLAT SHARE POST{" "}
      </Typography>
      <Box sx={{ boxShadow: "5px " }}>
        <SPForm
          onSubmit={handleFlatPost}
          resolver={zodResolver(createFlatSchema)}
          defaultValues={defaultFlatValues}
        >
          <Grid container spacing={2} my={1}>
            <Grid item xs={12} md={6}>
              <SPInput
                label="Location"
                fullWidth={true}
                name="location"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SPInput
                label="Description"
                fullWidth={true}
                name="description"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SPInput
                label="Rent Amount"
                fullWidth={true}
                name="rentAmount"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SPInput
                label="Bed Rooms"
                fullWidth={true}
                name="bedrooms"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SPInput
                label="Amenities"
                fullWidth={true}
                name="amenities"
                required
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <SPFileUploader name="file" label="Upload Files" />
            </Grid>

            {error && (
              <Typography ml={2} color="error">
                {error}
              </Typography>
            )}
          </Grid>
          <Button
            sx={{ margin: "10px 0px" }}
            fullWidth={true}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress color={"success"} />
            ) : (
              <Typography component="p" color="white">
                Share Flat
              </Typography>
            )}
          </Button>
        </SPForm>
      </Box>
    </Box>
  );
};

export default PostFlat;
