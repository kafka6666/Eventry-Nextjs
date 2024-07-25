"use client";

import { performLogin } from "@/actions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  async function loginFormOnSubmit(e) {
    e.preventDefault();
    console.log(e);

    try {
      const formData = new FormData(e.currentTarget);
      const foundUser = await performLogin(formData);

      if (foundUser) {
        setAuth(foundUser);
        router.push("/");
      } else {
        setError("Please provide a valid login credentials. Try again!");
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <>
      <div className="my-2 text-red-500">{error}</div>
      <form className="login-form" onSubmit={loginFormOnSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
