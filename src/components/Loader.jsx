import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      <p className="text-zinc-400 text-sm font-medium">
        Loading delicious recipes...
      </p>
    </div>
  );
}
