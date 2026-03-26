"use client";

import { useState } from "react";
import { SAVINGS_MILESTONES } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Building,
  Star,
  Shield,
  BookOpen,
  Heart,
  Home,
  Store,
  HandHeart,
  Plus,
  Trash2,
  DollarSign,
  Target,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building,
  star: Star,
  shield: Shield,
  "book-open": BookOpen,
  heart: Heart,
  home: Home,
  store: Store,
  "hand-heart": HandHeart,
};

interface SavingsGoal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function SavingsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "Emergency Fund",
      icon: "shield",
      targetAmount: 10000,
      currentAmount: 3500,
      description: "6 months expenses",
    },
    {
      id: "2",
      name: "Hajj Fund",
      icon: "star",
      targetAmount: 12000,
      currentAmount: 2000,
      description: "Fifth pillar of Islam",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: "",
    icon: "shield",
    targetAmount: 5000,
    description: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [addAmountGoalId, setAddAmountGoalId] = useState<string | null>(null);
  const [addAmount, setAddAmount] = useState("");

  const handleAddGoal = () => {
    if (!newGoal.name) return;

    const milestone = SAVINGS_MILESTONES.find((m) => m.name === newGoal.name);

    setGoals([
      ...goals,
      {
        id: Date.now().toString(),
        name: newGoal.name,
        icon: milestone?.icon || newGoal.icon,
        targetAmount: newGoal.targetAmount,
        currentAmount: 0,
        description: milestone?.description || newGoal.description,
      },
    ]);

    setNewGoal({ name: "", icon: "shield", targetAmount: 5000, description: "" });
    setDialogOpen(false);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleAddAmount = () => {
    if (!addAmountGoalId || !addAmount) return;

    setGoals(
      goals.map((g) =>
        g.id === addAmountGoalId
          ? { ...g, currentAmount: g.currentAmount + parseFloat(addAmount) }
          : g
      )
    );

    setAddAmountGoalId(null);
    setAddAmount("");
  };

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Savings Goals
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your halal savings milestones
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Savings Goal</DialogTitle>
              <DialogDescription>
                Choose from common Islamic savings milestones or create a custom
                goal.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Goal Type</Label>
                <Select
                  value={newGoal.name}
                  onValueChange={(value) => {
                    const milestone = SAVINGS_MILESTONES.find(
                      (m) => m.name === value
                    );
                    setNewGoal({
                      ...newGoal,
                      name: value,
                      targetAmount: milestone?.defaultGoal || 5000,
                      description: milestone?.description || "",
                      icon: milestone?.icon || "shield",
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SAVINGS_MILESTONES.map((milestone) => (
                      <SelectItem key={milestone.name} value={milestone.name}>
                        {milestone.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="Custom">Custom Goal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newGoal.name === "Custom" && (
                <div className="space-y-2">
                  <Label>Custom Goal Name</Label>
                  <Input
                    placeholder="e.g., New Car Fund"
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, name: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Target Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) =>
                      setNewGoal({
                        ...newGoal,
                        targetAmount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Card */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Total Saved</div>
              <div className="font-serif text-3xl font-bold text-primary">
                {formatCurrency(totalSaved)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Total Target</div>
              <div className="font-serif text-3xl font-bold">
                {formatCurrency(totalTarget)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Active Goals</div>
              <div className="font-serif text-3xl font-bold">{goals.length}</div>
            </div>
          </div>
          <Progress
            value={totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0}
            className="mt-6 h-3"
          />
        </CardContent>
      </Card>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <Target className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-semibold">No savings goals yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first halal savings goal to start tracking your
              progress.
            </p>
            <Button className="mt-4" onClick={() => setDialogOpen(true)}>
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => {
            const Icon = iconMap[goal.icon] || Shield;
            const progress =
              goal.targetAmount > 0
                ? (goal.currentAmount / goal.targetAmount) * 100
                : 0;
            const isComplete = goal.currentAmount >= goal.targetAmount;

            return (
              <Card
                key={goal.id}
                className={cn(
                  "transition-colors hover:border-primary/50",
                  isComplete && "border-green-500/30 bg-green-50/50 dark:bg-green-900/10"
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {isComplete && (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{goal.name}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(goal.currentAmount)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      of {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant={isComplete ? "default" : "secondary"}>
                      {progress.toFixed(0)}% complete
                    </Badge>
                    <span className="text-muted-foreground">
                      {formatCurrency(goal.targetAmount - goal.currentAmount)} to
                      go
                    </span>
                  </div>

                  {/* Add Amount Dialog */}
                  <Dialog
                    open={addAmountGoalId === goal.id}
                    onOpenChange={(open) =>
                      setAddAmountGoalId(open ? goal.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full gap-2">
                        <Plus className="h-4 w-4" />
                        Add Funds
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add to {goal.name}</DialogTitle>
                        <DialogDescription>
                          Enter the amount you want to add to this goal.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="0"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setAddAmountGoalId(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddAmount}>Add Amount</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
