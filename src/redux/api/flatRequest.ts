import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const flatRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    flatRequestPost: build.mutation({
      query: (data) => {
        return {
          url: "/flat-share/booking-requests",
          method: "POST",
          data,
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.flatRequestPost],
    }),

    getAllFlatBookings: build.query({
      query: () => {
        return {
          url: `/flat-share/get-all-requests`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.flatRequestGet],
    }),
    getFlatBookingsByUserId: build.query({
      query: () => {
        return {
          url: `/flat-share/get-user-booking-requests`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.flatRequestGet],
    }),
    updateFlatRequestStatus: build.mutation({
      query: (data) => {
        return {
          url: `/flat-share/booking-requests/${data.id}`,
          method: "PUT",
          data,
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.flatRequestGet],
    }),
    getBookingByFlatId: build.query({
      query: () => ({
        url: `/flat-share/get-all-requests-user`,
        method: "GET",
      }),
      providesTags: [tagTypes.flatRequestGet],
    }),
  }),
});

export const {
  useFlatRequestPostMutation,
  useGetAllFlatBookingsQuery,
  useGetFlatBookingsByUserIdQuery,
  useUpdateFlatRequestStatusMutation,
  useGetBookingByFlatIdQuery,
} = flatRequestApi;
