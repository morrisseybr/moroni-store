"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-36">
      <h2>Alguma coisa está errada, tente novamente.</h2>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
