import { baseApi } from "@features/api";
import {
  IAdminResponse,
  IAdminLoginCredentials,
  IAdminLoginResponse,
  IAdminLogoutRequest,
  IValidateTokenResponse,
} from "./types";

// const ADMIN_URL = "http://localhost:8000/api";
const ADMIN_URL = "/api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/register`,
        method: "POST",
        body: data,
      }),
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

    adminProfile: builder.query<IAdminResponse, void>({
      query: () => ({
        url: `${ADMIN_URL}/admin-profile`,
        method: "GET",
      }),
    }),
    updateAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/update-admin`,
        method: "PUT",
        body: data,
      }),
    }),
    adminLogout: builder.mutation<void, IAdminLogoutRequest>({
      query: ({ admin }) => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
        body: admin,
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

  useValidateTokenQuery,
  useRefreshTokenMutation,
  useVerifySessionQuery,
} = authApi;
