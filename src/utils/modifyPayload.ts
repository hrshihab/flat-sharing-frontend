export const modifyPayload = (values: any) => {
  //console.log(values, "values");

  // Clone the input values to avoid mutating the original object
  const obj = { ...values };

  // Extract and log the files
  const files = obj["file"];
  //console.log(files, "files");

  // Convert amenities string to array if it is a string
  if (typeof obj["amenities"] === "string") {
    obj["amenities"] = obj["amenities"].split(" ");
  }
  //console.log(obj, "obj");

  // Remove the file property from the object
  delete obj["file"];

  // Convert the remaining object to a JSON string
  const data = JSON.stringify(obj);
  //console.log(data, "data");

  // Create a FormData object and append the JSON string
  const formData = new FormData();
  formData.append("data", data);

  // Append each file to the FormData object
  if (Array.isArray(files)) {
    files.forEach((file, index) => {
      //console.log(file, "file", index);
      formData.append("files", file);
    });
  } else if (files) {
    // Ensure that files is not undefined or null
    formData.append("files", files as Blob);
  }

  //console.log(formData, "formData");

  return formData;
};
