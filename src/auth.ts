import NextAuth, { DefaultSession } from "next-auth";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { Role } from "./interfaces";
import "next-auth/jwt";

// Extender las interfaces de `next-auth` para incluir los campos adicionales
declare module "next-auth" {
  interface User {
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if(trigger === "update") {
        return {...token, ...session}
      }
      if (user) {
        token.id = user.id ?? "";
        token.role = user.role;
      }
      return token;
    },
  },
});
