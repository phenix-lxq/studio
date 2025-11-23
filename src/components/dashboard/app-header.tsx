import { Activity, Waves } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-card sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary" />
        <h1 className="text-lg font-bold tracking-tighter text-foreground">
          SensorViz Pro
        </h1>
      </Link>
      <nav className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" asChild>
          <Link href="/">Sensor Dashboard</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/noise" className="flex items-center gap-2">
            <Waves className="w-4 h-4" />
            Noise Analysis
          </Link>
        </Button>
      </nav>
    </header>
  );
}
