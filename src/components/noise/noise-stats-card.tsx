"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { NoiseStats } from "@/lib/noise-utils";

interface NoiseStatsCardProps {
  title: string;
  description: string;
  stats: NoiseStats;
  unit: string;
}

export function NoiseStatsCard({ title, description, stats, unit }: NoiseStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Mean</span>
            <span className="font-bold text-lg tabular-nums">{stats.mean.toFixed(2)} {unit}</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Peak</span>
            <span className="font-bold text-lg tabular-nums">{stats.peak.toFixed(2)} {unit}</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Minimum</span>
            <span className="font-bold text-lg tabular-nums">{stats.min.toFixed(2)} {unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
