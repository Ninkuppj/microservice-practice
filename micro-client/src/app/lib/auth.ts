import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import callAPI from "./api-helper";
import { CONSTANTS } from "./constants";
import AuthService from "../api/public/route";
export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        id: 'Credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
        async authorize(credentials) {
            try {
                const response:any = await AuthService.login(credentials);
                return response;
              } catch (error: any) {
                if (error) {
                  switch (error.type) {
                    case 'CredentialsSignin':
                      return CONSTANTS.LOG_REQUEST.WRONG_CREDENTIALS
                    default:
                      return CONSTANTS.LOG_REQUEST.PASSWORD_NOT_MATCH;
                  }
              }
            }
      }
    }),
    ],
  pages: {
    signIn: '/login'
  },
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, user}:any) {
        // Check if the user is authenticated
        
        if (user) {
          // Assign the access token to the JWT token
          token.accessToken = user.data.accessToken;
          token.refreshToken = user.data.refreshToken;

          // set expire time to 25 minutes later
          const now = new Date();
          now.setMinutes(now.getMinutes() + 25);
          token.accessTokenExpiry = now;
          
          token.email = user.data.user?.email ?? "";
          token.role = user.data.user?.role.id ?? 3;

          const shouldRefresh = new Date(token.accessTokenExpiry) < new Date();

          if (!shouldRefresh) {
          return Promise.resolve(token);
          }

          try {
          const refreshTokenResponse:any = await callAPI(
            'auth/refresh-token',
            {
              body: user.data.refreshToken,
            }
          );

          const { accessToken } = refreshTokenResponse.data;
          token.accessToken = accessToken;
          // set expire time to 25 minutes later
          const now = new Date();
          now.setMinutes(now.getMinutes() + 25);
          token.accessTokenExpiry = now;
          } catch (error) {
          token.error = "RefreshToken Invalid";
        }
      }
  
        return Promise.resolve(token);
      },
      async signIn({ user, account, profile, email, credentials }:any) {
        if (user.status===200) {
          return true
        } else {
          // Return false to display a default error message
          return false
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      },
    async session({ session, token }:any) {
        session.user = token
        return Promise.resolve(session);
    },
  },
  session: {
    strategy: 'jwt',
},
logger: {
  error(code, metadata) {
    console.error(code, metadata)
  },
  warn(code) {
    console.warn(code)
  },
  debug(code, metadata) {
    console.debug(code, metadata)
  }
}
};

