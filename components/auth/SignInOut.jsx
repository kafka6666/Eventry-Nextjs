"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInOut = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const router = useRouter();

  const logout = () => {
    setAuth(null); // Clear the auth state
    router.push("/login"); // Redirect to login page after logout
  };
  return (
    <div>
      {auth ? (
        <>
          <span className="mx-2">Hello, {auth?.name}</span>
          <span className="mx-1"> | </span>
          <a className="cursor-pointer" onClick={logout}>
            Logout
          </a>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default SignInOut;
