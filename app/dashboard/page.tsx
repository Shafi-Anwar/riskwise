"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { LayoutDashboard, FileText, Settings, Sun, Moon } from "lucide-react";

type RiskReport = {
  id: string;
  title: string;
  description: string | null;
  businessType: string;
  riskLevel: "low" | "medium" | "high";
  createdAt: string;
};

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [businessType, setBusinessType] = useState("freelancer");
  const [reports, setReports] = useState<RiskReport[]>([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    fetch("/api/risk-report")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error("Unexpected report data:", data);
          toast.error("Invalid report format.");
        }
      })
      .catch(() => toast.error("Failed to fetch reports"));
  }, []);

  const handleCreateReport = async () => {
    const res = await fetch("/api/risk-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        businessType,
        riskLevel,
        analysis: {
          score: Math.floor(Math.random() * 100),
          flags: ["auto-generated"],
        },
      }),
    });

    if (res.ok) {
      const newReport = await res.json();
      setReports((prev) => [newReport, ...prev]);
      setTitle("");
      setDescription("");
      toast.success("✅ Report created");
    } else {
      toast.error("❌ Failed to create report");
    }
  };

  const riskStats = Array.isArray(reports)
    ? reports.reduce(
        (acc, r) => {
          acc[r.riskLevel]++;
          return acc;
        },
        { low: 0, medium: 0, high: 0 }
      )
    : { low: 0, medium: 0, high: 0 };

  const chartData = [
    { name: "Low", value: riskStats.low },
    { name: "Medium", value: riskStats.medium },
    { name: "High", value: riskStats.high },
  ];

  const lineData = reports.map((r) => ({
    date: new Date(r.createdAt).toLocaleDateString(),
    level: r.riskLevel === "low" ? 1 : r.riskLevel === "medium" ? 2 : 3,
  }));

  const riskColors = {
    low: "#4ade80",
    medium: "#facc15",
    high: "#f87171",
  };

  return (
    <div className="min-h-screen flex font-serif text-base text-zinc-800 dark:text-zinc-100 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-white dark:bg-zinc-900 border-r border-zinc-300 dark:border-zinc-800 shadow-md">
        <div className="space-y-8">
          <div className="text-2xl font-bold">📋 RiskWise</div>
          <nav className="space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:underline"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/reports"
              className="flex items-center gap-3 hover:underline"
            >
              <FileText className="w-4 h-4" />
              Reports
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 hover:underline"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </nav>
        </div>
        <Button
          variant="outline"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-10 flex items-center gap-2"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
          Theme
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 space-y-14 overflow-y-auto">
        <h1 className="text-4xl font-semibold text-center">
          📊 Your Journey’s Summary
        </h1>

        {/* Charts */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-medium mb-4">🥧 Risk Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        riskColors[
                          entry.name.toLowerCase() as keyof typeof riskColors
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-medium mb-4">📈 Risk Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis
                  domain={[1, 3]}
                  tickFormatter={(v) => ["Low", "Medium", "High"][v - 1]}
                />
                <Tooltip />
                <Line type="monotone" dataKey="level" stroke="#60a5fa" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Create Report */}
        <section className="max-w-3xl mx-auto">
          <Card className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              📝 Create New Risk Report
            </h2>
            <div className="space-y-3">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Describe the risk..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={riskLevel}
                  onChange={(e) =>
                    setRiskLevel(e.target.value as "low" | "medium" | "high")
                  }
                  className="border rounded-lg p-2 dark:bg-zinc-800"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="border rounded-lg p-2 dark:bg-zinc-800"
                >
                  <option value="freelancer">Freelancer</option>
                  <option value="agency">Agency</option>
                </select>
              </div>
              <Button
                onClick={handleCreateReport}
                className="w-full bg-zinc-800 text-white hover:bg-zinc-700"
              >
                Submit Report
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
