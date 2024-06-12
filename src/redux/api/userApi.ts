import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: "/user/editprofile",
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateUserMutation } = userApi;
