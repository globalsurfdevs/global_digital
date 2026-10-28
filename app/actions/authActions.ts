"use server";

import { signIn, signOut } from "@/auth";

type SignInType = {
  username: string;
  password: string;
};

export const signInWithCredentials = async ({
  username,
  password,
}: SignInType) => {
  console.log("Here", username, password);
  try {
    const user = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (user.error) {
      return { success: false, message: user.error };
    }

    return { success: true, message: "Successfully signed in" };
  } catch (err) {
    console.log("Error in sign action:", err);
    return { success: false, message: "Invalid Credentials" };
  }
};

// The UI signs out client-side via next-auth/react's signOut (POST to
// /api/auth/signout, which middleware skips). Kept for server-side callers.
// signOut() redirects by throwing, so it must not be wrapped in try/catch.
export const signOutAdmin = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};
