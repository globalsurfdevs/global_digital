import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

import { supabase } from '@/app/lib/initSupabase'
import ratelimit from "./app/lib/rateLimit";


export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        console.log(supabase)


        let { data: user } = await supabase
          .from('users')
          .select('*').eq('username',credentials.username).single()


        if (user) {
          if(user.password === credentials.password){
            return user
          }else{
            throw new Error("Invalid Credentials")
          }
        }
        // If no error and we have user data, return it
        // Return null if user data could not be retrieved
        throw new Error("Invalid Credentials")
      }
    })
  ],
  callbacks: {
    authorized: async ({ request, auth }) => {
      
      const isLoggedIn = auth?.user
      if (isLoggedIn) {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
        const result = await ratelimit.limit(ip);
        
        if (!result.success) {
          return Response.json(
            { message: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }else{
          if(request.nextUrl.pathname.startsWith('/admin/auth/signin')){
            return Response.redirect((new URL('/admin', request.nextUrl)))
          }
        }
      }
      console.log("REEEEEEEEEEE")
      return !!auth
    }
  },
  pages: {
    signIn: '/admin/auth/signin'
  },
});
