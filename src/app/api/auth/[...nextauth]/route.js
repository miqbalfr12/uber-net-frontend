import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import {signOut} from "next-auth/react";
import {menuAdmin, menuPelanggan, menuOwner} from "./routes";

const authOptions = {
 session: {
  strategy: "jwt",
 },
 secret: process.env.NEXTAUTH_SECRET,
 providers: [
  Credentials({
   type: "credentials",
   name: "Credentials",
   credentials: {
    username: {label: "username", type: "username"},
    password: {label: "password", type: "password"},
   },
   authorize: async (credentials, req) => {
    const {password, username} = credentials;
    const userData = await fetch(
     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1.0.0/auth/signin`,
     {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({password, id: username}),
     }
    ).then(async (res) => {
     const jsonData = await res.json();
     return {...jsonData, statusCode: res.status};
    });
    if (userData.statusCode === 200) {
     return userData.user;
    } else {
     throw new Error(userData.message || "Password salah");
    }
   },
  }),
 ],
 callbacks: {
  async jwt({token, user, account, profile}) {
   if (account?.provider === "credentials") {
    token.user_id = user.user_id;
    token.name = user.name;
    token.username = user.username;
    token.email = user.email;
    token.nik = user.nik;
    token.role = user.role;
    token.token = user.token;
    token.expires = Date.now() + 60 * 1000; // 1 minute
   }
   return token;
  },
  async session({session, token}) {
   if (Date.now() > token.expires) {
    console.log("session expired");
    const userData = await fetch(
     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1.0.0/user/profile`,
     {
      headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token.token}`,
      },
      cache: "no-store",
     }
    ).then(async (res) => {
     const jsonData = await res.json();
     return {...jsonData, statusCode: res.status};
    });
    if (userData.error) {
     return signOut({callbackUrl: "https://ubernetsolution.site/"});
    }
    token.expires = Date.now() + 60 * 1000 * 60 * 24; // 1 day
   }
   if ("user_id" in token) {
    session.user.user_id = token.user_id;
   }
   if ("name" in token) {
    session.user.name = token.name;
   }
   if ("username" in token) {
    session.user.username = token.username;
   }
   if ("email" in token) {
    session.user.email = token.email;
   }
   if ("nik" in token) {
    session.user.nik = token.nik;
   }
   if ("role" in token) {
    session.user.role = token.role;
    if (token.role === "owner") {
     session.user.menuItems = menuOwner;
     session.user.color = "#005B8A";
    }
    if (token.role === "admin") {
     session.user.menuItems = menuAdmin;
     session.user.color = "#9B4900";
    }
    if (token.role === "pelanggan") {
     session.user.menuItems = menuPelanggan;
     session.user.color = "#2B6100";
    }
   }
   if ("token" in token) {
    session.user.token = token.token;
   }
   return session;
  },
 },
 pages: {
  signIn: "/",
 },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
