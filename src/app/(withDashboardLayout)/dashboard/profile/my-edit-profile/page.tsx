"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SPInput from "@/components/Forms/SPInput";
import SPForm from "@/components/Forms/SPForm";
import SPFileUploader from "@/components/Forms/SPFileUploader";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import SPModal from "@/components/Shared/SPModal/SPModal";
import { modifyPayload } from "@/utils/modifyPayload";

const updateProfileSchema = z.object({
  username: z.string().nonempty("Username is required!"),
  email: z.string().email("Invalid email address!"),
  file: z.any(),
});

type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

const defaultProfileValues: UpdateProfileValues = {
  username: "",
  email: "",
  file: [],
};

const ProfileDisplay = () => {
  const { data, error, isLoading } = useGetSingleUserQuery({});
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading user data</Typography>;

  const handleProfileUpdate = async (values: FieldValues) => {
    //console.log("values", values);

    try {
      const formData = modifyPayload(values);
      // console.log("formData", formData);
      const res = await updateUser(formData).unwrap();
      // console.log("res", res);
      if (res?.id) {
        toast.success("Profile updated successfully!");
        setModalOpen(false);
      } else {
        toast.error("Error updating profile");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error("Error updating profile");
    }
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          width: { md: "50%", sm: "100%" },
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          p: 5,
          borderRadius: 10,
          mx: "auto",
          my: 5,
          gap: 2,
        }}
      >
        <Avatar
          src={data?.profilePhoto}
          alt={data?.username}
          sx={{ width: 150, height: 150, mx: "auto" }}
        />
        <Box>
          <Typography
            variant="h5"
            color="primary.main"
            mb={2}
            sx={{ textAlign: "center" }}
          >
            User Information
          </Typography>
          <Box
            sx={{
              background: "#f4f7fe",
              borderRadius: 1,
              width: "100%",
              padding: "8px 16px",
              mb: 2,
            }}
          >
            <Typography color="primary" variant="caption">
              Username
            </Typography>
            <Typography>{data?.username}</Typography>
          </Box>
          <Box
            sx={{
              background: "#f4f7fe",
              borderRadius: 1,
              width: "100%",
              padding: "8px 16px",
              mb: 2,
            }}
          >
            <Typography color="primary" variant="caption">
              Email
            </Typography>
            <Typography>{data?.email}</Typography>
          </Box>
          <Box
            sx={{
              background: "#f4f7fe",
              borderRadius: 1,
              width: "100%",
              padding: "8px 16px",
            }}
          >
            <Typography color="primary" variant="caption">
              Role
            </Typography>
            <Typography>{data?.role}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "white", width: "50%", mx: "auto" }}
          onClick={() => setModalOpen(true)}
        >
          Edit Profile
        </Button>
      </Box>

      <SPModal open={isModalOpen} setOpen={setModalOpen} title="Edit Profile">
        <SPForm
          onSubmit={handleProfileUpdate}
          resolver={zodResolver(updateProfileSchema)}
          defaultValues={{
            username: data?.username ?? defaultProfileValues.username,
            email: data?.email ?? defaultProfileValues.email,
          }}
        >
          <SPInput
            sx={{ mx: "auto", my: 1 }}
            label="Username"
            fullWidth={true}
            name="username"
            required
          />
          <SPInput
            sx={{ mx: "auto", my: 1 }}
            label="Email"
            fullWidth={true}
            name="email"
            required
            readOnly={true}
          />
          <SPFileUploader
            sx={{ mx: "auto", my: 1 }}
            name="file"
            label="Upload Profile Photo"
          />
          {isUpdating ? (
            <CircularProgress />
          ) : (
            <Button
              sx={{
                margin: "10px 0px",
                color: "primary.main",
                width: "50%",
                mx: "auto",
                ml: 1,
              }}
              fullWidth={true}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Update Profile
            </Button>
          )}
        </SPForm>
      </SPModal>
    </>
  );
};

export default ProfileDisplay;
