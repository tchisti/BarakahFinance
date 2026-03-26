"use client";

import { useState, useMemo } from "react";
import { SAMPLE_STOCKS, type Stock } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CheckCircle2, XCircle, AlertTriangle, Info, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  pass: {
    label: "Halal",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  fail: {
    label: "Not Halal",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
  caution: {
    label: "Caution",
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
};

const sectors = ["All", ...new Set(SAMPLE_STOCKS.map((s) => s.sector))];
const statuses = ["All", "pass", "fail", "caution"];

function RatioBar({ value, threshold, label }: { value: number; threshold: number; label: string }) {
  const percentage = Math.min(value * 100, 100);
  const isPassing = value <= threshold;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-medium", isPassing ? "text-green-600" : "text-red-600")}>
          {(value * 100).toFixed(0)}%
        </span>
      </div>
      <Progress
        value={percentage}
        className={cn(
          "h-2",
          isPassing ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500"
        )}
      />
      <div className="text-xs text-muted-foreground">
        Threshold: {(threshold * 100).toFixed(0)}%
      </div>
    </div>
  );
}

function StockDetailDialog({ stock }: { stock: Stock }) {
  const status = statusConfig[stock.status];
  const StatusIcon = status.icon;

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted font-mono text-lg font-bold">
            {stock.ticker}
          </div>
          <div>
            <DialogTitle>{stock.name}</DialogTitle>
            <DialogDescription>{stock.sector}</DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center gap-2">
          <Badge className={cn("gap-1", status.bg, status.color)}>
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </Badge>
        </div>

        {/* Financial Ratios */}
        <div className="space-y-4">
          <h4 className="font-semibold">Shariah Screening Ratios</h4>
          <RatioBar
            value={stock.debtRatio}
            threshold={0.33}
            label="Debt to Market Cap"
          />
          <RatioBar
            value={stock.interestIncome}
            threshold={0.05}
            label="Interest Income"
          />
          <RatioBar
            value={stock.nonCompliantRev}
            threshold={0.05}
            label="Non-Compliant Revenue"
          />
        </div>

        {/* Analysis */}
        <div className="space-y-2">
          <h4 className="font-semibold">Analysis</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {stock.notes}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-lg bg-muted p-4 text-xs text-muted-foreground">
          <p>
            <strong>Disclaimer:</strong> This screening is for educational purposes
            only. Financial data changes quarterly. Always verify current compliance
            with an official Shariah screening service before investing.
          </p>
        </div>
      </div>
    </DialogContent>
  );
}

export default function ScreenerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStocks = useMemo(() => {
    return SAMPLE_STOCKS.filter((stock) => {
      const matchesSearch =
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector =
        sectorFilter === "All" || stock.sector === sectorFilter;
      const matchesStatus =
        statusFilter === "All" || stock.status === statusFilter;
      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [searchQuery, sectorFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      pass: SAMPLE_STOCKS.filter((s) => s.status === "pass").length,
      fail: SAMPLE_STOCKS.filter((s) => s.status === "fail").length,
      caution: SAMPLE_STOCKS.filter((s) => s.status === "caution").length,
    };
  }, []);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Halal Stock Screener
        </h1>
        <p className="mt-2 text-muted-foreground">
          Check if popular stocks meet Shariah-compliance criteria
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.pass}</div>
              <div className="text-sm text-muted-foreground">Halal Stocks</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.caution}</div>
              <div className="text-sm text-muted-foreground">Requires Caution</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.fail}</div>
              <div className="text-sm text-muted-foreground">Not Halal</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ticker or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="pass">Halal Only</SelectItem>
                <SelectItem value="caution">Caution</SelectItem>
                <SelectItem value="fail">Not Halal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Screening Criteria Info */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4" />
            Shariah Screening Criteria
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <div className="grid gap-2 sm:grid-cols-3">
            <div>Debt/Market Cap: &lt;33%</div>
            <div>Interest Income: &lt;5%</div>
            <div>Non-Compliant Revenue: &lt;5%</div>
          </div>
        </CardContent>
      </Card>

      {/* Stocks Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ticker</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead className="text-center">Debt Ratio</TableHead>
                  <TableHead className="text-center">Interest</TableHead>
                  <TableHead className="text-center">Non-Compliant</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock) => {
                  const status = statusConfig[stock.status];
                  const StatusIcon = status.icon;

                  return (
                    <TableRow key={stock.ticker}>
                      <TableCell className="font-mono font-semibold">
                        {stock.ticker}
                      </TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{stock.sector}</Badge>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center",
                          stock.debtRatio > 0.33 ? "text-red-600" : "text-green-600"
                        )}
                      >
                        {(stock.debtRatio * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center",
                          stock.interestIncome > 0.05
                            ? "text-red-600"
                            : "text-green-600"
                        )}
                      >
                        {(stock.interestIncome * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center",
                          stock.nonCompliantRev > 0.05
                            ? "text-red-600"
                            : "text-green-600"
                        )}
                      >
                        {(stock.nonCompliantRev * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("gap-1", status.bg, status.color)}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Info className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <StockDetailDialog stock={stock} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredStocks.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No stocks found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
