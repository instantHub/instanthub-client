import { baseApi } from "@features/api";
import { IAdminLoginCredentials, IAdminLoginResponse } from "./types";
import { TAdminRole } from "@utils/types";

// const ADMIN_URL = "http://localhost:8000/api";
const ADMIN_URL = "/api/admin";

export const auth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

    refreshToken: builder.mutation<void, void>({
      query: () => ({
        url: `${ADMIN_URL}/refresh`,
        method: "GET",
      }),
    }),

    verifySession: builder.query<{ valid: boolean }, void>({
      query: () => `${ADMIN_URL}/verify-session`,
    }),

    logout: builder.mutation<void, { id: string; role: TAdminRole }>({
      query: (data) => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useVerifySessionQuery,
} = auth;
