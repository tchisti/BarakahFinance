"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Percent,
  PiggyBank,
  Target,
  Sparkles,
} from "lucide-react";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
};

const chartConfig = {
  principal: {
    label: "Contributions",
    color: "hsl(var(--chart-5))",
  },
  growth: {
    label: "Growth",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function SimulatorPage() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(25);
  const [purificationRate, setPurificationRate] = useState(2);

  const calculations = useMemo(() => {
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    const yearlyData = [];

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        yearlyData.push({
          year,
          principal: initialInvestment,
          total: initialInvestment,
          growth: 0,
        });
        continue;
      }

      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }

      yearlyData.push({
        year,
        principal: Math.round(totalContributions),
        total: Math.round(balance),
        growth: Math.round(balance - totalContributions),
      });
    }

    const finalBalance = balance;
    const totalGrowth = balance - totalContributions;
    const purificationAmount = (totalGrowth * purificationRate) / 100;
    const netBalance = finalBalance - purificationAmount;

    return {
      finalBalance,
      totalContributions,
      totalGrowth,
      purificationAmount,
      netBalance,
      yearlyData,
    };
  }, [initialInvestment, monthlyContribution, annualReturn, years, purificationRate]);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Halal Wealth Simulator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Project your halal investment growth over time
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Inputs */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Investment Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Initial Investment</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) =>
                      setInitialInvestment(Number(e.target.value) || 0)
                    }
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Monthly Contribution</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) =>
                      setMonthlyContribution(Number(e.target.value) || 0)
                    }
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Expected Annual Return</Label>
                  <span className="text-sm font-medium">{annualReturn}%</span>
                </div>
                <Slider
                  value={[annualReturn]}
                  onValueChange={(v) => setAnnualReturn(v[0])}
                  max={15}
                  min={4}
                  step={0.5}
                />
                <p className="text-xs text-muted-foreground">
                  Historical average for halal ETFs: 8-10%
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Investment Period</Label>
                  <span className="text-sm font-medium">{years} years</span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={(v) => setYears(v[0])}
                  max={40}
                  min={5}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Purification Rate</Label>
                  <span className="text-sm font-medium">{purificationRate}%</span>
                </div>
                <Slider
                  value={[purificationRate]}
                  onValueChange={(v) => setPurificationRate(v[0])}
                  max={5}
                  min={0}
                  step={0.5}
                />
                <p className="text-xs text-muted-foreground">
                  Percentage of growth to donate as purification
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4" />
                Investment Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>- Hold halal ETFs like SPUS or HLAL in TFSA for tax-free growth</p>
              <p>- Start early - time in market beats timing the market</p>
              <p>- Purify dividends from screened stocks that have minimal non-compliant revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6 lg:col-span-2">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Final Balance
                </div>
                <div className="mt-1 text-2xl font-bold text-primary">
                  {formatCurrency(calculations.finalBalance)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PiggyBank className="h-4 w-4" />
                  Contributions
                </div>
                <div className="mt-1 text-2xl font-bold">
                  {formatCurrency(calculations.totalContributions)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Investment Growth
                </div>
                <div className="mt-1 text-2xl font-bold text-green-600">
                  {formatCurrency(calculations.totalGrowth)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  Purification
                </div>
                <div className="mt-1 text-2xl font-bold text-amber-600">
                  {formatCurrency(calculations.purificationAmount)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Projected Growth Over {years} Years</CardTitle>
              <CardDescription>
                Compound growth of your halal investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <AreaChart data={calculations.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    tickFormatter={(value) => `Y${value}`}
                    tickLine={false}
                  />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} tickLine={false} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [
                          formatCurrency(value as number),
                          name === "principal" ? "Contributions" : "Growth",
                        ]}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="principal"
                    stackId="1"
                    stroke="hsl(var(--chart-5))"
                    fill="hsl(var(--chart-5))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="growth"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Net Summary */}
          <Card className="border-primary bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Net Balance After Purification</h3>
                  <p className="text-sm text-muted-foreground">
                    Your estimated halal wealth after {years} years
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-serif text-4xl font-bold text-primary">
                    {formatCurrency(calculations.netBalance)}
                  </div>
                  <Badge className="mt-1">
                    {((calculations.totalGrowth / calculations.totalContributions) * 100).toFixed(0)}% return
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
