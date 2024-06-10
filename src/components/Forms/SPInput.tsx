import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  //readOnly?: boolean;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
};

const SPInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  //readOnly = false,
  required,
  defaultValue = "",
}: TInputProps) => {
  const { control } = useFormContext();
  //console.log(`Field name: ${name}, ReadOnly: ${readOnly}`);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          // InputProps={{
          //   readOnly: readOnly,
          // }}
        />
      )}
    />
  );
};

export default SPInput;
