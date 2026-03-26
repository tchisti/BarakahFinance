"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  DollarSign,
  Calendar,
  Percent,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Building2,
} from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState(600000);
  const [downPayment, setDownPayment] = useState(120000);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(25);

  const calculations = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const totalPayments = term * 12;

    // Conventional mortgage calculation
    const conventionalMonthly =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const conventionalTotalPaid = conventionalMonthly * totalPayments;
    const conventionalInterest = conventionalTotalPaid - principal;

    // Musharakah simulation (similar monthly but structured as rent + equity purchase)
    // For comparison purposes, using equivalent rate
    const musharakahMonthly = conventionalMonthly;
    const musharakahTotalPaid = musharakahMonthly * totalPayments;

    return {
      principal,
      downPaymentPercent: (downPayment / homePrice) * 100,
      conventional: {
        monthly: conventionalMonthly,
        totalPaid: conventionalTotalPaid,
        interest: conventionalInterest,
      },
      musharakah: {
        monthly: musharakahMonthly,
        totalPaid: musharakahTotalPaid,
        profitShare: musharakahTotalPaid - principal,
      },
    };
  }, [homePrice, downPayment, rate, term]);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Mortgage Comparison
        </h1>
        <p className="mt-2 text-muted-foreground">
          Compare conventional mortgages with Islamic home financing options
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calculator Inputs */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Financing Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Down Payment</Label>
                  <span className="text-sm text-muted-foreground">
                    {calculations.downPaymentPercent.toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={[downPayment]}
                  onValueChange={(v) => setDownPayment(v[0])}
                  max={homePrice * 0.5}
                  min={homePrice * 0.05}
                  step={5000}
                />
                <div className="text-right text-sm font-medium">
                  {formatCurrency(downPayment)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Rate / Profit Rate</Label>
                  <span className="text-sm text-muted-foreground">{rate}%</span>
                </div>
                <Slider
                  value={[rate]}
                  onValueChange={(v) => setRate(v[0])}
                  max={10}
                  min={3}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Amortization</Label>
                  <span className="text-sm text-muted-foreground">
                    {term} years
                  </span>
                </div>
                <Slider
                  value={[term]}
                  onValueChange={(v) => setTerm(v[0])}
                  max={30}
                  min={10}
                  step={5}
                />
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="text-sm text-muted-foreground">
                  Principal Amount
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(calculations.principal)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Results */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="comparison" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
              <TabsTrigger value="details">Structure Details</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Conventional */}
                <Card className="border-red-200 dark:border-red-900/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Conventional
                      </CardTitle>
                      <Badge variant="destructive">Interest-Based</Badge>
                    </div>
                    <CardDescription>
                      Traditional mortgage with interest
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <div className="text-sm text-muted-foreground">
                        Monthly Payment
                      </div>
                      <div className="text-3xl font-bold">
                        {formatCurrency(calculations.conventional.monthly)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Total Paid Over {term} Years
                        </span>
                        <span className="font-medium">
                          {formatCurrency(calculations.conventional.totalPaid)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Total Interest Paid
                        </span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(calculations.conventional.interest)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Structure</span>
                        <span className="font-medium">Loan + Interest</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Islamic */}
                <Card className="border-green-200 dark:border-green-900/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Diminishing Musharakah
                      </CardTitle>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Shariah-Compliant
                      </Badge>
                    </div>
                    <CardDescription>
                      Co-ownership with gradual buyout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <div className="text-sm text-muted-foreground">
                        Monthly Payment
                      </div>
                      <div className="text-3xl font-bold">
                        {formatCurrency(calculations.musharakah.monthly)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Total Paid Over {term} Years
                        </span>
                        <span className="font-medium">
                          {formatCurrency(calculations.musharakah.totalPaid)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Partner Profit Share
                        </span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(calculations.musharakah.profitShare)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Structure</span>
                        <span className="font-medium">Rent + Equity Purchase</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Difference */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Key Structural Difference</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    While the monthly payment amounts may be similar, the
                    fundamental structure is different. In a conventional
                    mortgage, the bank lends you money and charges interest. In
                    Diminishing Musharakah, you and the bank jointly own the
                    property — you pay rent for their portion and gradually buy
                    their share. If you default at 40% ownership, you keep that
                    40% equity. The bank is your partner, not your creditor.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    How Diminishing Musharakah Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="font-semibold">1. Joint Purchase</div>
                      <p className="text-sm text-muted-foreground">
                        You contribute {formatCurrency(downPayment)} (
                        {calculations.downPaymentPercent.toFixed(0)}%) and the
                        financier contributes {formatCurrency(calculations.principal)}{" "}
                        ({(100 - calculations.downPaymentPercent).toFixed(0)}%).
                        Both become co-owners.
                      </p>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="font-semibold">2. Monthly Payment</div>
                      <p className="text-sm text-muted-foreground">
                        Your payment has two parts: rent for using the
                        bank&apos;s share, and a purchase payment to buy more of
                        their share.
                      </p>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="font-semibold">3. Growing Ownership</div>
                      <p className="text-sm text-muted-foreground">
                        Each month, your ownership percentage increases while
                        the bank&apos;s decreases. Your rent portion decreases
                        proportionally.
                      </p>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <div className="font-semibold">4. Full Ownership</div>
                      <p className="text-sm text-muted-foreground">
                        At the end of the term, you own 100% of the home. The
                        partnership dissolves and the bank transfers full title.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>North American Providers</CardTitle>
                  <CardDescription>
                    Islamic home financing available in Canada and USA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Canada</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Manzil (manzil.ca)</li>
                        <li>• Zero Mortgage (zeromortgage.ca)</li>
                        <li>• UM Financial (umfinancial.com)</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">USA</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Guidance Residential (guidanceresidential.com)</li>
                        <li>• UIF Corporation (myuif.com)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
