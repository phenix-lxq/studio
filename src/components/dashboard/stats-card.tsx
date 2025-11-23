"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Stats } from "@/lib/sensor-utils";

interface StatsCardProps {
  title: string;
  description: string;
  stats: Stats;
  unit: string;
}

export function StatsCard({ title, description, stats, unit }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Axis</TableHead>
              <TableHead className="text-right">Mean</TableHead>
              <TableHead className="text-right">Peak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(stats).map(([axis, values]) => (
              <TableRow key={axis}>
                <TableCell className="font-medium uppercase">{axis.slice(-1)}</TableCell>
                <TableCell className="text-right tabular-nums">{values.mean.toFixed(3)} {unit}</TableCell>
                <TableCell className="text-right tabular-nums">{values.peak.toFixed(3)} {unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
