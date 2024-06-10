import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const manageUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => {
        return {
          url: `/user/all-user`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
    changeUserStatus: build.mutation({
      query: ({ id, status }) => {
        //console.log(status, "redux api");
        return {
          url: `/user/editstatus`,
          method: "PATCH",
          data: { id, status },
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    changeUserRole: build.mutation({
      query: ({ id, role }) => {
        //console.log(role, "redux api role change");
        return {
          url: `/user/editstatus`,
          method: "PATCH",
          data: { id, role },
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useChangeUserStatusMutation,
  useChangeUserRoleMutation,
} = manageUserApi;
