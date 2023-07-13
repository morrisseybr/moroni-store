import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";

const adminUsers = [
  {
    id: "1",
    email: "samuel.morrissey@outlook.com",
    passwordHash:
      "481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5",
  },
  {
    id: "2",
    email: "email.do.simon@outlook.com",
    passwordHash:
      "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
  },
] as const;

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userExists = adminUsers.find((user) => {
          user.email === credentials?.email;
        });
        const passwordMatches =
          userExists?.passwordHash ===
          crypto
            .createHash("sha256")
            .update(credentials?.password || "")
            .digest("hex");

        if (passwordMatches) {
          const user: User = {
            id: userExists.id,
            email: userExists.email,
            isAdmin: true,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.isAdmin = user.isAdmin;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin || false;
      }
      return session;
    },
  },
};

export { authOptions };
