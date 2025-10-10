import { baseApi } from "@features/api";
import { IAdmin, ICreateAdminPayload } from "./types";
import { ADMIN_API_TAG } from "./constants";

const ADMIN_URL = "/api/admin";

export const admin = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminProfile: builder.query<IAdmin, void>({
      query: () => ({
        url: `${ADMIN_URL}/profile`,
        method: "GET",
      }),
    }),

    createAdmin: builder.mutation<IAdmin, ICreateAdminPayload>({
      query: (data) => ({
        url: `${ADMIN_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ADMIN_API_TAG],
    }),

    getAdmins: builder.query<IAdmin[], void>({
      query: () => `${ADMIN_URL}/all-admin`,
      providesTags: [ADMIN_API_TAG],
    }),

    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [ADMIN_API_TAG],
    }),

    deleteAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ADMIN_API_TAG],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAdminProfileQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = admin;
