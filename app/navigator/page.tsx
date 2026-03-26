"use client";

import { useState } from "react";
import { LIFE_STAGES } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Briefcase,
  Users,
  TrendingUp,
  Heart,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "graduation-cap": GraduationCap,
  briefcase: Briefcase,
  users: Users,
  "trending-up": TrendingUp,
  heart: Heart,
};

const priorityConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    label: "Critical",
  },
  high: {
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    label: "High Priority",
  },
  medium: {
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    label: "Recommended",
  },
};

export default function NavigatorPage() {
  const [activeStage, setActiveStage] = useState(LIFE_STAGES[0].id);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Financial Life Navigator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Halal financial guidance tailored to your life stage
        </p>
      </div>

      <Tabs value={activeStage} onValueChange={setActiveStage}>
        <TabsList className="mb-8 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {LIFE_STAGES.map((stage) => {
            const Icon = iconMap[stage.icon] || GraduationCap;
            return (
              <TabsTrigger
                key={stage.id}
                value={stage.id}
                className="flex items-center gap-2 rounded-lg border px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">{stage.title}</div>
                  <div className="text-xs opacity-70">{stage.age}</div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {LIFE_STAGES.map((stage) => {
          const StageIcon = iconMap[stage.icon] || GraduationCap;
          return (
            <TabsContent key={stage.id} value={stage.id}>
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <StageIcon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{stage.title}</CardTitle>
                      <CardDescription className="text-base">
                        Ages {stage.age} - {stage.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {stage.steps.map((step, i) => {
                  const priorityInfo = priorityConfig[step.priority];
                  const PriorityIcon = priorityInfo.icon;

                  return (
                    <Card
                      key={i}
                      className={cn(
                        "border-l-4 transition-colors hover:border-primary/50",
                        step.priority === "critical"
                          ? "border-l-red-500"
                          : step.priority === "high"
                            ? "border-l-amber-500"
                            : "border-l-green-500"
                      )}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full",
                                priorityInfo.bg
                              )}
                            >
                              <PriorityIcon
                                className={cn("h-4 w-4", priorityInfo.color)}
                              />
                            </div>
                            <CardTitle className="text-lg">{step.action}</CardTitle>
                          </div>
                          <Badge className={priorityInfo.badge}>
                            {priorityInfo.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="leading-relaxed text-muted-foreground">
                          {step.detail}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
