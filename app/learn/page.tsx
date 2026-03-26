"use client";

import { useState } from "react";
import { LESSONS, type Lesson } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Ban,
  TrendingUp,
  FileText,
  Handshake,
  Gem,
  Shield,
  BarChart3,
  Home,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ban: Ban,
  "trending-up": TrendingUp,
  "file-text": FileText,
  handshake: Handshake,
  gem: Gem,
  shield: Shield,
  "bar-chart-3": BarChart3,
  home: Home,
};

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const progress = (completedLessons.length / LESSONS.length) * 100;

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setActiveTab("content");
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
      setCompletedLessons([...completedLessons, selectedLesson.id]);
    }
  };

  const getQuizScore = () => {
    if (!selectedLesson) return 0;
    let correct = 0;
    selectedLesson.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) correct++;
    });
    return correct;
  };

  const handleNextLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = LESSONS.findIndex((l) => l.id === selectedLesson.id);
    if (currentIndex < LESSONS.length - 1) {
      handleStartLesson(LESSONS[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = LESSONS.findIndex((l) => l.id === selectedLesson.id);
    if (currentIndex > 0) {
      handleStartLesson(LESSONS[currentIndex - 1]);
    }
  };

  if (selectedLesson) {
    const Icon = iconMap[selectedLesson.icon] || BookOpen;
    const currentIndex = LESSONS.findIndex((l) => l.id === selectedLesson.id);

    return (
      <div className="container py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => setSelectedLesson(null)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Button>

        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{selectedLesson.category}</Badge>
                <Badge className={difficultyColors[selectedLesson.difficulty]}>
                  {selectedLesson.difficulty}
                </Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {selectedLesson.duration}
                </span>
              </div>
              <h1 className="mt-2 font-serif text-3xl font-bold">
                {selectedLesson.title}
              </h1>
            </div>
          </div>

          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-center font-serif italic text-muted-foreground">
                &quot;{selectedLesson.verse}&quot;
              </p>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="quiz" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                Quiz
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6 space-y-6">
              {selectedLesson.content.map((section, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-xl">{section.heading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">
                      {section.text}
                    </p>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-center pt-4">
                <Button onClick={() => setActiveTab("quiz")} className="gap-2">
                  Take the Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="mt-6 space-y-6">
              {selectedLesson.quiz.map((question, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {i + 1}. {question.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={quizAnswers[i]?.toString()}
                      onValueChange={(value) =>
                        setQuizAnswers({ ...quizAnswers, [i]: parseInt(value) })
                      }
                      disabled={quizSubmitted}
                    >
                      {question.options.map((option, j) => (
                        <div
                          key={j}
                          className={cn(
                            "flex items-center space-x-3 rounded-lg border p-4 transition-colors",
                            quizSubmitted && j === question.answer
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : quizSubmitted &&
                                  quizAnswers[i] === j &&
                                  j !== question.answer
                                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                : "hover:bg-muted/50"
                          )}
                        >
                          <RadioGroupItem value={j.toString()} id={`q${i}-o${j}`} />
                          <Label
                            htmlFor={`q${i}-o${j}`}
                            className="flex-1 cursor-pointer"
                          >
                            {option}
                          </Label>
                          {quizSubmitted && j === question.answer && (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          )}
                          {quizSubmitted &&
                            quizAnswers[i] === j &&
                            j !== question.answer && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              {!quizSubmitted ? (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={
                      Object.keys(quizAnswers).length < selectedLesson.quiz.length
                    }
                    size="lg"
                  >
                    Submit Quiz
                  </Button>
                </div>
              ) : (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-bold">
                      You scored {getQuizScore()} / {selectedLesson.quiz.length}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {getQuizScore() === selectedLesson.quiz.length
                        ? "Excellent! You've mastered this lesson."
                        : "Review the content and try again to improve your understanding."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <Button
              variant="outline"
              onClick={handlePrevLesson}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Lesson {currentIndex + 1} of {LESSONS.length}
            </span>
            <Button
              variant="outline"
              onClick={handleNextLesson}
              disabled={currentIndex === LESSONS.length - 1}
              className="gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Learning Center
        </h1>
        <p className="mt-2 text-muted-foreground">
          Master Islamic finance through interactive lessons and quizzes
        </p>
      </div>

      {/* Progress Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedLessons.length} of {LESSONS.length} lessons completed
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>

      {/* Lessons Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LESSONS.map((lesson) => {
          const Icon = iconMap[lesson.icon] || BookOpen;
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <Card
              key={lesson.id}
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50 hover:shadow-md",
                isCompleted && "border-green-500/30 bg-green-50/50 dark:bg-green-900/10"
              )}
              onClick={() => handleStartLesson(lesson)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline">{lesson.category}</Badge>
                  <Badge className={difficultyColors[lesson.difficulty]}>
                    {lesson.difficulty}
                  </Badge>
                </div>
                <CardTitle className="mt-2">{lesson.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lesson.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {isCompleted ? "Review Lesson" : "Start Lesson"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
