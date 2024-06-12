"use client";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SPInput from "@/components/Forms/SPInput";
import SPForm from "@/components/Forms/SPForm";
import { FieldValues } from "react-hook-form";
import { useFlatPostMutation } from "@/redux/api/flatApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import uploadImage from "@/utils/imageUploadToBB";

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
  photos: z.any(),
});

type FlatFormValues = z.infer<typeof createFlatSchema>;

const defaultFlatValues: FlatFormValues = {
  location: "",
  description: "",
  rentAmount: 1000,
  bedrooms: 2,
  amenities: "",
  photos: [],
};

const PostFlat = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [photos, setPhotos] = useState<{ imageUrl: string }[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const [flatPost, { isLoading }] = useFlatPostMutation();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) {
      console.log("No files selected");
      return;
    }

    try {
      const uploadedPhotos: { imageUrl: string }[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        //console.log(file, "file");
        const response = await uploadImage(file);
        //console.log(response, "response");
        if (response) {
          uploadedPhotos.push(response.imageUrl);
        } else {
          console.log(`Failed to upload file: ${file.name}`);
        }
      }
      setPhotos(uploadedPhotos);
      setImageLoading(false);
      //console.log(uploadedPhotos, "uploadedPhotos"); // Log the uploaded photos
    } catch (error) {
      console.error(error, "comes from flat post");
    }
  };

  const handleFlatPost = async (values: FieldValues) => {
    values["amenities"] = values["amenities"].split(" ");
    //console.log({ photos }, "photos"); // Log the photos before submitting the form

    try {
      const res = await flatPost({ ...values, photos }).unwrap();
      //console.log(res, "res");
      if (res?.id) {
        toast.success("Flat created successfully!!");
        router.push("/flats");
      } else {
        toast.error("Failed to create flat!!");
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
              <Input
                type="file"
                inputProps={{ multiple: true }}
                onChange={handleImageChange}
                required
              />
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
