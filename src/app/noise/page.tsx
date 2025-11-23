
"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { Upload, Download, FileWarning, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { type ChartConfig } from "@/components/ui/chart";

import { AppHeader } from "@/components/dashboard/app-header";
import { NoiseChart } from "@/components/noise/noise-chart";
import { NoiseStatsCard } from "@/components/noise/noise-stats-card";
import { calculateNoiseStats, parseNoiseData, type NoiseDataPoint } from "@/lib/noise-utils";

const noiseChartConfig = {
  noiseLevel: { label: "Noise Level", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export default function NoiseDashboardPage() {
  const [noiseData, setNoiseData] = useState<NoiseDataPoint[]>([]);
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
      const parsedData = parseNoiseData(text);
      
      if (parsedData) {
        setNoiseData(parsedData);
        toast({
          title: "Import Successful",
          description: `${file.name} has been processed and visualized.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: "Could not parse file. Check format and required headers (timestamp, noise_level).",
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

  const noiseStats = useMemo(() => calculateNoiseStats(noiseData), [noiseData]);

  const handleExportData = useCallback(() => {
    if (noiseData.length === 0) {
      toast({ title: "No Data", description: "There is no data to export.", variant: "destructive" });
      return;
    }
    
    // This is a mocked export function.
    toast({
      title: "Export Initiated",
      description: "In a real application, this would download a CSV file.",
    });
  }, [noiseData, toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Noise Data Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button onClick={handleImportClick}>
              <Upload className="w-4 h-4 mr-2" /> Import Noise Data
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

        {noiseData.length > 0 ? (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <NoiseChart
                  title="Noise Level"
                  description="Time-series data for ambient noise levels."
                  data={noiseData}
                  chartConfig={noiseChartConfig}
                  unit="dB"
                />
              </div>
              <NoiseStatsCard
                  title="Noise Analysis"
                  description="Mean, peak, and minimum values for noise levels."
                  stats={noiseStats}
                  unit="dB"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-24 text-center border-2 border-dashed rounded-lg bg-card/50">
            <Waves className="w-16 h-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Noise Data to Display</h3>
            <p className="max-w-md mx-auto mt-2 text-sm text-muted-foreground">
              Click the "Import Noise Data" button to upload your noise readings from a CSV or text file.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
