import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const flatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    flatPost: build.mutation({
      query: (data) => {
        return {
          url: "/flat/create-flat",
          method: "POST",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.flatPost],
    }),

    getFlatPosts: build.query({
      query: (args) => {
        //console.log(args);
        return {
          url: `/flat/get-all-flats`,
          method: "GET",
          params: args,
        };
      },
      providesTags: [tagTypes.flatPost],
    }),

    getFlatPostByUserId: build.query({
      query: () => {
        return {
          url: `/flat/get-my-flats`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.flatPost],
    }),

    getSingleFlat: build.query({
      query: (flatId) => {
        console.log(flatId);
        return {
          //don't change the below( // )
          url: `/flat/getSingleFlat/${flatId}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.flatRequestGet],
    }),
    flatUpdate: build.mutation({
      query: (data) => {
        return {
          url: `/flat/updateFlat/${data.id}`,
          method: "PATCH",
          data,
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.flatPost],
    }),
    flatDelete: build.mutation({
      query: (id) => {
        return {
          url: `/flat/deleteFlat/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.flatPost],
    }),
  }),
});

export const {
  useFlatPostMutation,
  useGetFlatPostsQuery,
  useGetFlatPostByUserIdQuery,
  useGetSingleFlatQuery,
  useFlatUpdateMutation,
  useFlatDeleteMutation,
} = flatApi;
