import { baseApi } from "@features/api";
import {
  IAdminResponse,
  IAdminLoginCredentials,
  IAdminLoginResponse,
  IAdminLogoutRequest,
  IValidateTokenResponse,
} from "./types";
import { ADMIN_API_TAG } from "./constant";

// const ADMIN_URL = "http://localhost:8000/api";
const ADMIN_URL = "/api/admin";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ADMIN_API_TAG],
    }),
    login: builder.mutation<IAdminLoginResponse, IAdminLoginCredentials>({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    validateToken: builder.query<IValidateTokenResponse, void>({
      query: () => ({ url: `${ADMIN_URL}/validate-token` }),
    }),

    refreshToken: builder.mutation<void, void>({
      query: () => ({
        url: `${ADMIN_URL}/refresh`,
        method: "GET",
      }),
    }),

    verifySession: builder.query<{ valid: boolean }, void>({
      query: () => `${ADMIN_URL}/verify-session`,
    }),

    getAdmins: builder.query<IAdminResponse[], void>({
      query: () => `${ADMIN_URL}/all-admin`,
      providesTags: [ADMIN_API_TAG],
    }),

    adminProfile: builder.query<IAdminResponse, void>({
      query: () => ({
        url: `${ADMIN_URL}/admin-profile`,
        method: "GET",
      }),
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
    adminLogout: builder.mutation<void, void>({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAdminProfileQuery,
  useUpdateAdminMutation,
  useAdminLogoutMutation,

  useGetAdminsQuery,
  useDeleteAdminMutation,
  useValidateTokenQuery,
  useRefreshTokenMutation,
  useVerifySessionQuery,
} = authApi;
