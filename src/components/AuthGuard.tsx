"use client";

// src/components/AuthGuard.tsx
import { useEffect } from "react";
import { parseCookies } from "nookies"; // A helper library for cookies
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = ["/"]; // Define the public routes

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname(); // Gets the current route

  useEffect(() => {
    const cookies = parseCookies();
    const authToken = cookies.auth_token || cookies.superadmin_token;
    console.log(pathname, !authToken && !publicRoutes.includes(pathname));

    // If the user is authenticated and trying to access a public route
    if (authToken && publicRoutes.includes(pathname)) {
      return;
    }

    // If the user is not authenticated and trying to access a protected route
    if (!authToken && !publicRoutes.includes(pathname)) {
      router.push("/"); // Redirect to login or home
    }
  }, [pathname, router]); // Re-run effect on route changes

  return <>{children}</>;
};

export default AuthGuard;
