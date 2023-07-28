import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-96">
      <Loader2 className="animate-spin" />
    </div>
  );
}
