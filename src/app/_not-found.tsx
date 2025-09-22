"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = "Not Found";
    }
  }, []);

  return <div>404 Page</div>;
}
