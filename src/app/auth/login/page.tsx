"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  const handleLogin = () => signIn("instagram");

  return (
    <div>
      <h1>Login with Instagram</h1>
      <button onClick={handleLogin}>Login with Instagram</button>
    </div>
  );
}
