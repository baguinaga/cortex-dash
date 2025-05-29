"use client";
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

export default function LoginPage() {
  const { token, login } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token, router]);

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onLogin={login} />
    </div>
  );
}
