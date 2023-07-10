import { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          allowed:
            profile.email === "samuel.morrissey@gmail.com" ? true : false,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.allowed = user.allowed;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.allowed = token.allowed;
      }
      return session;
    },
  },
};

export { authOptions };
