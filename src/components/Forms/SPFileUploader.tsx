import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function SPFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ ...sx }}
          >
            {label || "Upload files"}
            <Input
              {...field}
              type="file"
              inputProps={{ multiple: true }}
              onChange={(e) => {
                const files = Array.from(
                  (e?.target as HTMLInputElement).files || []
                );
                onChange(files);
              }}
              style={{ display: "none" }}
            />
          </Button>
        );
      }}
    />
  );
}
