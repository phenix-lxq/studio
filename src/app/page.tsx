"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { Upload, Download, BarChart3, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { type ChartConfig } from "@/components/ui/chart";

import { AppHeader } from "@/components/dashboard/app-header";
import { SensorChart } from "@/components/dashboard/sensor-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { calculateStats, parseSensorData, type SensorDataPoint } from "@/lib/sensor-utils";

const accelerometerChartConfig = {
  ax: { label: "X-Axis", color: "hsl(var(--chart-1))" },
  ay: { label: "Y-Axis", color: "hsl(var(--chart-2))" },
  az: { label: "Z-Axis", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const gyroscopeChartConfig = {
  gx: { label: "X-Axis", color: "hsl(var(--chart-4))" },
  gy: { label: "Y-Axis", color: "hsl(var(--chart-5))" },
  gz: { label: "Z-Axis", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [sensorData, setSensorData] = useState<SensorDataPoint[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedData = parseSensorData(text);
      
      if (parsedData) {
        setSensorData(parsedData);
        toast({
          title: "Import Successful",
          description: `${file.name} has been processed and visualized.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: "Could not parse file. Check format and required headers.",
          action: <FileWarning className="w-5 h-5"/>
        });
      }
    };
    reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "File Error",
          description: "An error occurred while reading the file.",
        });
    }
    reader.readAsText(file);
    // Reset file input value to allow re-uploading the same file
    event.target.value = "";
  }, [toast]);

  const accelerometerStats = useMemo(() => calculateStats(sensorData, ['ax', 'ay', 'az']), [sensorData]);
  const gyroscopeStats = useMemo(() => calculateStats(sensorData, ['gx', 'gy', 'gz']), [sensorData]);

  const handleExportData = useCallback(() => {
    if (sensorData.length === 0) {
      toast({ title: "No Data", description: "There is no data to export.", variant: "destructive" });
      return;
    }
    
    // This is a mocked export function.
    toast({
      title: "Export Initiated",
      description: "In a real application, this would download a CSV file.",
    });
  }, [sensorData, toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Sensor Data Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button onClick={handleImportClick}>
              <Upload className="w-4 h-4 mr-2" /> Import Data
            </Button>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" /> Export Data
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv,.txt"
            />
          </div>
        </div>

        {sensorData.length > 0 ? (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <SensorChart
                title="Accelerometer"
                description="Time-series data for 3-axis acceleration."
                data={sensorData}
                chartConfig={accelerometerChartConfig}
                unit="m/s²"
              />
              <SensorChart
                title="Gyroscope"
                description="Time-series data for 3-axis angular velocity."
                data={sensorData}
                chartConfig={gyroscopeChartConfig}
                unit="°/s"
              />
            </div>
             <div className="grid gap-6 lg:grid-cols-2">
                <StatsCard
                    title="Accelerometer Analysis"
                    description="Mean and peak values for each axis."
                    stats={accelerometerStats}
                    unit="m/s²"
                />
                <StatsCard
                    title="Gyroscope Analysis"
                    description="Mean and peak values for each axis."
                    stats={gyroscopeStats}
                    unit="°/s"
                />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-24 text-center border-2 border-dashed rounded-lg bg-card/50">
            <BarChart3 className="w-16 h-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Data to Display</h3>
            <p className="max-w-md mx-auto mt-2 text-sm text-muted-foreground">
              Click the "Import Data" button to upload and visualize your sensor readings from a CSV or text file.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
