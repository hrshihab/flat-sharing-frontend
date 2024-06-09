"use client";
import React from "react";
import {
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import SPModal from "@/components/Shared/SPModal/SPModal";
import SPForm from "@/components/Forms/SPForm";
import SPInput from "@/components/Forms/SPInput";
import { FieldValues, Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFlatRequestPostMutation } from "@/redux/api/flatRequest";
import { toast } from "sonner";

// Define the form validation schema using Zod
const flatBookingSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  age: z.preprocess(
    (val) => (val ? parseInt(val.toString(), 10) : undefined),
    z.number().min(0, { message: "Age must be a positive number" })
  ),
  profession: z.string().nonempty({ message: "Profession is required" }),
  maritalStatus: z.enum(["MARRIED", "SINGLE", "SEPERATED"], {
    message: "Marital status is required",
  }),
  PresentAddress: z
    .string()
    .nonempty({ message: "Present Address is required" }),
  phoneNo: z.string().nonempty({ message: "Phone Number is required" }),
});

const FlatShareModal = ({ params, open, setOpen }: any) => {
  const [flatRequestPost] = useFlatRequestPostMutation();
  const methods = useForm({
    resolver: zodResolver(flatBookingSchema),
    defaultValues: {
      name: "",
      age: "",
      profession: "",
      maritalStatus: "", // Initialize with empty string
      PresentAddress: "",
      phoneNo: "",
    },
  });

  const { handleSubmit, control } = methods;

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      values["age"] = parseInt(values["age"]);
      //console.log({ ...values, flatId: params.flatId });
      const res = await flatRequestPost({
        ...values,
        flatId: params.flatId,
      }).unwrap();
      if (res?.id) {
        toast.success("Request submitted successfully");
        setOpen(false);
      } else {
        toast.error("Failed to submit request");
      }
      //console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <SPModal open={open} setOpen={setOpen} title="Flat Share Request">
      <SPForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={12}>
            <SPInput name="name" label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <SPInput name="age" label="Age" fullWidth required type="number" />
          </Grid>
          <Grid item xs={12}>
            <SPInput name="profession" label="Profession" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Marital Status</InputLabel>
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Marital Status"
                    value={field.value || ""}
                    onChange={field.onChange}
                  >
                    <MenuItem value="MARRIED">Married</MenuItem>
                    <MenuItem value="SINGLE">Single</MenuItem>
                    <MenuItem value="SEPERATED">Separated</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <SPInput
              name="PresentAddress"
              label="Present Address"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <SPInput name="phoneNo" label="Phone Number" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </SPForm>
    </SPModal>
  );
};

export default FlatShareModal;
