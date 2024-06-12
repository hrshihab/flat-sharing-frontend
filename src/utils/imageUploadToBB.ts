import axios from "axios";

const uploadImage = async (img: File) => {
  try {
    let formData = new FormData();
    formData.append("image", img);

    //console.log("Uploading image:", img);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=d7dacdd67e65dc51f95cad41e91d3712`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log("API response:", data);

    if (data && data.data) {
      let imageUrl = data.data.display_url;
      let deleteUrl = data.data.delete_url;
      //console.log("Image URL:", imageUrl);
      // console.log("Delete URL:", deleteUrl);
      return { imageUrl, deleteUrl };
    } else {
      console.log("Invalid response structure:", data);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.response?.data);
    } else {
      console.log("Unknown error:", error);
    }
    return null;
  }
};

export default uploadImage;
