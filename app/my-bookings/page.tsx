"use client";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

export default function page() {
  const { data: session } = useSession();
  
}
