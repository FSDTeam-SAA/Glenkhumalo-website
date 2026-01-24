import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Helper to refresh token if needed (optional implementation stub)
async function refreshAccessToken(token: any) {
    try {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/reset-refresh-token";
        // This implementation depends on how your backend handles refresh tokens.
        // For now we will just return the token as is or implement proper logic if provided.
        // The visual prompt shows a refresh token flow but details might vary.
        // Simplest is to just re-login if expired for this demo unless specified.

        return token;
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) return null;

                    const response = await axios.post(
                        (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1") + "/auth/login",
                        {
                            email: credentials.email,
                            password: credentials.password,
                        }
                    );

                    if (response.data && response.data.success) {
                        const { accessToken, refreshToken, user, role, _id } = response.data.data;
                        return {
                            id: _id,
                            name: user.name,
                            email: user.email,
                            role: role,
                            accessToken,
                            refreshToken,
                            image: user.profileImage?.url,
                            ...user
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Login failed:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    // @ts-ignore
                    accessToken: user.accessToken,
                    // @ts-ignore
                    refreshToken: user.refreshToken,
                    // @ts-ignore
                    role: user.role,
                    // @ts-ignore
                    id: user.id
                };
            }
            return token;
        },
        async session({ session, token }) {
            // @ts-ignore
            session.accessToken = token.accessToken;
            // @ts-ignore
            session.user.role = token.role;
            // @ts-ignore
            session.user.id = token.id;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
