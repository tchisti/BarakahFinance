"use client";

import { useState, useMemo } from "react";
import {
  GOLD_PRICE_PER_GRAM,
  SILVER_PRICE_PER_GRAM,
  NISAB_GOLD_GRAMS,
  NISAB_SILVER_GRAMS,
  ZAKAT_RATE,
} from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  DollarSign,
  Info,
  TrendingUp,
  Building,
  Coins,
  CreditCard,
  Briefcase,
  Gem,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface AssetCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
  fields: { id: string; label: string; tooltip?: string }[];
}

const assetCategories: AssetCategory[] = [
  {
    id: "cash",
    label: "Cash & Bank",
    icon: DollarSign,
    tooltip: "All cash on hand and in bank accounts",
    fields: [
      { id: "cashOnHand", label: "Cash on Hand" },
      { id: "checkingAccounts", label: "Checking Accounts" },
      { id: "savingsAccounts", label: "Savings Accounts", tooltip: "Include only the principal, not interest earned" },
    ],
  },
  {
    id: "investments",
    label: "Investments",
    icon: TrendingUp,
    tooltip: "Stocks, mutual funds, and other investments",
    fields: [
      { id: "stocks", label: "Halal Stocks/ETFs" },
      { id: "mutualFunds", label: "Mutual Funds" },
      { id: "tfsa", label: "TFSA/Roth IRA", tooltip: "Market value of halal investments inside" },
      { id: "rrsp", label: "RRSP/401k", tooltip: "Some scholars say Zakat due only on accessible portion" },
      { id: "crypto", label: "Cryptocurrency" },
    ],
  },
  {
    id: "metals",
    label: "Gold & Silver",
    icon: Gem,
    tooltip: "Physical gold and silver at current market value",
    fields: [
      { id: "gold", label: "Gold Value", tooltip: "Current market value of gold jewelry and bullion" },
      { id: "silver", label: "Silver Value" },
    ],
  },
  {
    id: "business",
    label: "Business Assets",
    icon: Briefcase,
    tooltip: "Business inventory and receivables",
    fields: [
      { id: "inventory", label: "Business Inventory", tooltip: "Value of goods for sale" },
      { id: "receivables", label: "Receivables", tooltip: "Money owed to you that you expect to collect" },
    ],
  },
  {
    id: "realestate",
    label: "Investment Property",
    icon: Building,
    tooltip: "Rental properties (not primary residence)",
    fields: [
      { id: "rentalIncome", label: "Rental Income Saved", tooltip: "Accumulated rental income, not property value" },
    ],
  },
  {
    id: "debts",
    label: "Deductible Debts",
    icon: CreditCard,
    tooltip: "Debts due within the year that reduce zakatable wealth",
    fields: [
      { id: "creditCards", label: "Credit Card Balance" },
      { id: "loansPayable", label: "Loans Due This Year", tooltip: "Portion of loans due within the lunar year" },
      { id: "taxes", label: "Taxes Payable" },
    ],
  },
];

export default function ZakatPage() {
  const [assets, setAssets] = useState<Record<string, number>>({});
  const [calculated, setCalculated] = useState(false);

  const handleInputChange = (fieldId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAssets((prev) => ({ ...prev, [fieldId]: numValue }));
    setCalculated(false);
  };

  const nisabGold = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM;
  const nisabSilver = NISAB_SILVER_GRAMS * SILVER_PRICE_PER_GRAM;

  const calculations = useMemo(() => {
    const totalAssets =
      (assets.cashOnHand || 0) +
      (assets.checkingAccounts || 0) +
      (assets.savingsAccounts || 0) +
      (assets.stocks || 0) +
      (assets.mutualFunds || 0) +
      (assets.tfsa || 0) +
      (assets.rrsp || 0) +
      (assets.crypto || 0) +
      (assets.gold || 0) +
      (assets.silver || 0) +
      (assets.inventory || 0) +
      (assets.receivables || 0) +
      (assets.rentalIncome || 0);

    const totalDebts =
      (assets.creditCards || 0) +
      (assets.loansPayable || 0) +
      (assets.taxes || 0);

    const netZakatable = totalAssets - totalDebts;
    const meetsNisab = netZakatable >= nisabSilver;
    const zakatDue = meetsNisab ? netZakatable * ZAKAT_RATE : 0;

    return { totalAssets, totalDebts, netZakatable, meetsNisab, zakatDue };
  }, [assets, nisabSilver]);

  return (
    <TooltipProvider>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Zakat Calculator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Calculate your annual Zakat obligation accurately
          </p>
        </div>

        {/* Nisab Info */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Current Nisab Thresholds
            </CardTitle>
            <CardDescription>
              Based on current gold and silver prices. You must meet the nisab to be
              eligible for Zakat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <div className="text-sm text-muted-foreground">Gold Nisab (87.48g)</div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(nisabGold)}
                </div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <div className="text-sm text-muted-foreground">
                  Silver Nisab (612.36g) - Recommended
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(nisabSilver)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Asset Input Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="cash">
              <TabsList className="mb-6 flex h-auto flex-wrap gap-2 bg-transparent p-0">
                {assetCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="flex items-center gap-2 rounded-lg border px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {cat.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {assetCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.label}
                      </CardTitle>
                      <CardDescription>{category.tooltip}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={field.id}>{field.label}</Label>
                            {field.tooltip && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  {field.tooltip}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id={field.id}
                              type="number"
                              placeholder="0"
                              className="pl-8"
                              value={assets[field.id] || ""}
                              onChange={(e) =>
                                handleInputChange(field.id, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            <Button
              onClick={() => setCalculated(true)}
              size="lg"
              className="mt-6 w-full gap-2"
            >
              <Calculator className="h-4 w-4" />
              Calculate Zakat
            </Button>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-4">
            <Card className={calculated ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>Calculation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Assets</span>
                  <span className="font-semibold">
                    {formatCurrency(calculations.totalAssets)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Debts</span>
                  <span className="font-semibold text-red-600">
                    -{formatCurrency(calculations.totalDebts)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Net Zakatable Wealth</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(calculations.netZakatable)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Nisab Status</span>
                  {calculations.meetsNisab ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Meets Nisab
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Below Nisab
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {calculated && (
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-6 text-center">
                  <div className="text-sm text-muted-foreground">
                    Your Zakat Due (2.5%)
                  </div>
                  <div className="mt-2 font-serif text-4xl font-bold text-primary">
                    {formatCurrency(calculations.zakatDue)}
                  </div>
                  {!calculations.meetsNisab && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your wealth is below the nisab threshold. No Zakat is
                      obligatory, but Sadaqah is always encouraged.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  - Zakat is calculated on wealth held for one complete lunar year
                </p>
                <p>- Primary residence and personal vehicle are NOT zakatable</p>
                <p>- Consult a scholar for complex situations</p>
                <p>- Pay to registered charities for tax benefits</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
