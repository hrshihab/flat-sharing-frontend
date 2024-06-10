"use server";

export const registerUser = async (userData: any) => {
  try {
    const res = await fetch(
      "https://flat-sharing-backend-mauve.vercel.app/api/v1/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(userData),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to register user");
    }

    const userInfo = await res.json();
    return userInfo;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
};
