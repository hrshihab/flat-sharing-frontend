"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Input,
} from "@mui/material";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import SPInput from "@/components/Forms/SPInput";
import SPForm from "@/components/Forms/SPForm";
import { toast } from "sonner";
import SPModal from "@/components/Shared/SPModal/SPModal";
import { FieldValues } from "react-hook-form";
import uploadImage from "@/utils/imageUploadToBB";
import { UpdateProfileValues, updateProfileSchema } from "./validation";

const defaultProfileValues: UpdateProfileValues = {
  username: "",
  email: "",
  file: [],
};

const ProfileDisplay: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, error, isLoading } = useGetSingleUserQuery({});
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (photos.length > 0) {
      setImageLoading(false);
    }
  }, [photos]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("No files selected");
      return;
    }

    try {
      setImageLoading(true);
      const uploadedPhotos: string[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const response = await uploadImage(file);
        console.log("Response from uploadImage:", response);

        if (response && response.imageUrl) {
          uploadedPhotos.push(response.imageUrl);
        } else {
          console.log(`Failed to upload file: ${file.name}`);
        }
      }

      setPhotos(uploadedPhotos);
    } catch (error) {
      console.error("Error during image upload:", error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleProfileUpdate = async (values: FieldValues) => {
    if (imageLoading) {
      toast.warning("Images are still being uploaded. Please wait.");
      return;
    }

    const formatData = {
      username: values.username,
      email: values.email,
      profilePhoto: photos[0],
    };

    try {
      const res = await updateUser(formatData).unwrap();
      if (res?.id) {
        toast.success("Profile updated successfully!");
        setModalOpen(false);
        setPhotos([]); // Reset photos
      } else {
        toast.error("Error updating profile");
      }
    } catch (err: any) {
      console.error("Error updating profile:", err);
      toast.error("Error updating profile");
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading user data</Typography>;

  return (
    <>
      <Box
        component="div"
        sx={{
          width: { md: "50%", xs: "100%" },
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          p: 5,
          borderRadius: 7,
          mx: "auto",
          my: 5,
          gap: 2,
        }}
      >
        <Avatar
          src={data?.profilePhoto ?? ""}
          alt={data?.username ?? "User"}
          sx={{
            width: { xs: 70, md: 120, lg: 150 },
            height: { xs: 70, md: 120, lg: 150 },
            mx: "auto",
          }}
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
            <Typography>{data?.username ?? "N/A"}</Typography>
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
            <Typography>{data?.email ?? "N/A"}</Typography>
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
            <Typography>{data?.role ?? "N/A"}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "white", width: { xs: "100%", sm: "50%" }, mx: "auto" }}
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
            file: defaultProfileValues.file,
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
          />

          <Input
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleImageChange}
            required
          />

          {imageLoading && <CircularProgress />}
          {isUpdating ? (
            <CircularProgress />
          ) : (
            <Button
              sx={{
                margin: "10px 0px",
                color: "primary.main",
                width: { xs: "100%", sm: "50%" },
                mx: "auto",
                ml: 1,
              }}
              disabled={isLoading || imageLoading}
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
