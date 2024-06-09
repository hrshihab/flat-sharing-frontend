export const modifyPayload = (values: any) => {
  //console.log("values", values);
  const obj = { ...values };
  const file = obj["file"];
  //console.log("file", file);
  delete obj["file"];
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  formData.append("files", file as Blob);

  return formData;
};
