'use client';

import { UserAuthForm } from "./components/user-auth-form";
import "@/app/styles/globals.css";
import { SiteFooter } from "@/components/footer";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const { token, redirectIfAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    redirectIfAuthenticated(['/registration', '/login']);
  }, [redirectIfAuthenticated]);

  if (token) {
    return null; // or you could render a loading spinner here
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col min-h-screen overflow-hidden">
        <div className="flex-grow flex items-center justify-center px-4 sm:px-0">
          <UserAuthForm />
        </div>
        <div className="w-full mb-8">
          <SiteFooter/>
        </div>
      </div>
    </div>
  );
}