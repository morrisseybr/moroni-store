"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="ghost" size="icon">
      <ChevronLeft />
    </Button>
  );
}

export { BackButton };
