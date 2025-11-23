import { Activity } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-card sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary" />
        <h1 className="text-lg font-bold tracking-tighter text-foreground">
          SensorViz Pro
        </h1>
      </Link>
    </header>
  );
}
