"use client";
import React, { useEffect } from "react";
import { Grid, Button } from "@mui/material";
import SPModal from "@/components/Shared/SPModal/SPModal";
import SPForm from "@/components/Forms/SPForm";
import SPInput from "@/components/Forms/SPInput";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { get } from "http";
import { useFlatUpdateMutation } from "@/redux/api/flatApi";

// Define the form validation schema using Zod
const flatEditSchema = z.object({
  location: z.string().nonempty({ message: "Location is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  rentAmount: z.preprocess(
    (val) => (val ? parseFloat(val.toString()) : undefined),
    z.number().positive({ message: "Rent amount must be a positive number" })
  ),
  bedrooms: z.preprocess(
    (val) => (val ? parseInt(val.toString(), 10) : undefined),
    z.number().positive({ message: "Bedrooms must be a positive number" })
  ),
  amenities: z.string().nonempty({ message: "Amenities are required" }),
});

const FlatEditModal = ({ open, setOpen, flat }: any) => {
  const [flatUpdate, { data }] = useFlatUpdateMutation();
  const methods = useForm({
    resolver: zodResolver(flatEditSchema),
    defaultValues: {
      location: flat ? flat.location : "",
      description: flat ? flat.description : "",
      rentAmount: flat ? flat.rentAmount : 0,
      bedrooms: flat ? flat.bedrooms : 0,
      amenities: flat
        ? Array.isArray(flat.amenities)
          ? flat.amenities.join(", ")
          : ""
        : "",
    },
  });

  // useEffect(() => {
  //   if (flat) {
  //     methods.reset({
  //       location: flat.location,
  //       description: flat.description,
  //       rentAmount: flat.rentAmount,
  //       bedrooms: flat.bedrooms,
  //       amenities: Array.isArray(flat.amenities)
  //         ? flat.amenities.join(", ")
  //         : "",
  //     });
  //   }
  // }, [flat, methods]);

  const handleFormSubmit = async (values: any) => {
    try {
      const updatedValues = {
        ...values,
        id: flat.id,
        rentAmount: parseInt(values.rentAmount),
        bedrooms: parseInt(values.bedrooms),
        amenities: values.amenities.split(",").map((item: any) => item.trim()),
      };

      const res = await flatUpdate(updatedValues).unwrap();
      if (res?.id) {
        toast.success("Flat updated successfully");
        setOpen(false);
      } else {
        toast.error("Failed to update flat");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SPModal open={open} setOpen={setOpen} title="Edit Flat">
      <FormProvider {...methods}>
        <SPForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item xs={12}>
              <SPInput
                name="location"
                label="Location"
                fullWidth
                required
                defaultValue={flat?.location || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <SPInput
                name="description"
                label="Description"
                fullWidth
                required
                defaultValue={flat?.description || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <SPInput
                name="rentAmount"
                label="Rent Amount"
                fullWidth
                required
                type="number"
                defaultValue={flat?.rentAmount || 0}
              />
            </Grid>
            <Grid item xs={12}>
              <SPInput
                name="bedrooms"
                label="Bedrooms"
                fullWidth
                required
                type="number"
                defaultValue={flat?.bedrooms || 0}
              />
            </Grid>
            <Grid item xs={12}>
              <SPInput
                name="amenities"
                label="Amenities (comma-separated)"
                fullWidth
                required
                defaultValue={flat?.amenities.join(", ") || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </SPForm>
      </FormProvider>
    </SPModal>
  );
};

export default FlatEditModal;
