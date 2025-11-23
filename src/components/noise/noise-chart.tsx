"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

interface NoiseChartProps {
  title: string;
  description: string;
  data: any[];
  chartConfig: ChartConfig;
  unit: string;
}

export function NoiseChart({ title, description, data, chartConfig, unit }: NoiseChartProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toFixed(1)}
              unit={unit}
            />
            <Tooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value, payload) => {
                    if (payload && payload.length > 0) {
                      return new Date(payload[0].payload.timestamp).toLocaleString();
                    }
                    return value;
                  }}
                  formatter={(value, name, item) => (
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}}></span>
                        <span>{item.name}: <strong>{Number(value).toFixed(2)}</strong> {unit}</span>
                    </div>
                  )}
                />
              }
            />
             <defs>
              <linearGradient id="fillNoise" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-noiseLevel)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-noiseLevel)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="noiseLevel"
              type="monotone"
              fill="url(#fillNoise)"
              fillOpacity={0.4}
              stroke="var(--color-noiseLevel)"
              stackId="a"
            />
            <Line
              dataKey="noiseLevel"
              type="monotone"
              stroke={`var(--color-noiseLevel)`}
              strokeWidth={2}
              dot={false}
              name={chartConfig["noiseLevel"].label as string}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
