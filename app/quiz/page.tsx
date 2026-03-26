"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RefreshCw,
  BookOpen,
  Target,
  Clock,
  Award,
} from "lucide-react"

const quizzes = [
  {
    id: "basics",
    title: "Islamic Finance Basics",
    description: "Test your knowledge of fundamental Islamic finance concepts",
    questions: 10,
    duration: "10 min",
    difficulty: "Beginner",
    icon: BookOpen,
    color: "bg-emerald-500",
  },
  {
    id: "riba",
    title: "Understanding Riba",
    description: "Deep dive into the prohibition of interest in Islam",
    questions: 8,
    duration: "8 min",
    difficulty: "Intermediate",
    icon: Target,
    color: "bg-amber-500",
  },
  {
    id: "contracts",
    title: "Islamic Contracts",
    description: "Learn about Murabaha, Musharakah, Ijarah and more",
    questions: 12,
    duration: "15 min",
    difficulty: "Advanced",
    icon: Award,
    color: "bg-blue-500",
  },
]

const sampleQuestions = [
  {
    id: 1,
    question: "What does 'Riba' mean in Islamic finance?",
    options: ["Profit sharing", "Interest or usury", "Partnership", "Lease agreement"],
    correct: 1,
    explanation:
      "Riba refers to interest or usury, which is prohibited in Islam. It includes any excess compensation without due consideration.",
  },
  {
    id: 2,
    question: "Which of the following is a Shariah-compliant financing method?",
    options: ["Conventional mortgage", "Murabaha", "Credit card interest", "Payday loan"],
    correct: 1,
    explanation:
      "Murabaha is a cost-plus financing arrangement where the seller discloses the cost and profit margin to the buyer.",
  },
  {
    id: 3,
    question: "What is 'Gharar' in Islamic finance?",
    options: ["Profit", "Uncertainty or ambiguity", "Partnership", "Lease"],
    correct: 1,
    explanation:
      "Gharar refers to excessive uncertainty or ambiguity in contracts, which is prohibited to protect parties from unfair dealings.",
  },
  {
    id: 4,
    question: "What percentage of wealth is typically given as Zakat?",
    options: ["1%", "2.5%", "5%", "10%"],
    correct: 1,
    explanation:
      "Zakat is typically 2.5% of one's accumulated wealth above the nisab threshold, paid annually.",
  },
  {
    id: 5,
    question: "What is 'Musharakah'?",
    options: [
      "A lease agreement",
      "A joint partnership",
      "A cost-plus sale",
      "An interest-free loan",
    ],
    correct: 1,
    explanation:
      "Musharakah is a joint partnership where all parties contribute capital and share profits and losses.",
  },
  {
    id: 6,
    question: "Which industries are typically excluded from halal investments?",
    options: [
      "Technology and healthcare",
      "Alcohol, gambling, and conventional finance",
      "Real estate and agriculture",
      "Manufacturing and retail",
    ],
    correct: 1,
    explanation:
      "Halal investments exclude industries involving alcohol, gambling, pork, adult entertainment, and conventional financial services dealing in interest.",
  },
  {
    id: 7,
    question: "What is 'Sukuk'?",
    options: [
      "Islamic insurance",
      "Islamic bonds/certificates",
      "Islamic banking",
      "Islamic charity",
    ],
    correct: 1,
    explanation:
      "Sukuk are Islamic financial certificates similar to bonds but structured to comply with Shariah law, representing ownership in an asset.",
  },
  {
    id: 8,
    question: "What is 'Takaful'?",
    options: [
      "Islamic banking",
      "Islamic insurance",
      "Islamic investment",
      "Islamic charity",
    ],
    correct: 1,
    explanation:
      "Takaful is Islamic insurance based on mutual cooperation, where participants contribute to a fund used to support members in need.",
  },
]

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setAnswers([...answers, index])
    if (index === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const handleRestartQuiz = () => {
    setSelectedQuiz(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  const getScoreMessage = () => {
    const percentage = (score / sampleQuestions.length) * 100
    if (percentage >= 90) return { message: "Excellent! You are an Islamic finance expert!", color: "text-emerald-500" }
    if (percentage >= 70) return { message: "Great job! You have a solid understanding.", color: "text-blue-500" }
    if (percentage >= 50) return { message: "Good effort! Keep learning to improve.", color: "text-amber-500" }
    return { message: "Keep studying! Review the learning materials and try again.", color: "text-red-500" }
  }

  // Quiz Selection View
  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Test Your Knowledge
              </h1>
              <p className="text-lg text-muted-foreground">
                Interactive quizzes to assess and reinforce your Islamic finance understanding
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className={`w-12 h-12 ${quiz.color} rounded-xl flex items-center justify-center mb-4`}>
                    <quiz.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{quiz.title}</h3>
                  <p className="text-muted-foreground mb-4">{quiz.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      <BookOpen className="h-3 w-3" />
                      {quiz.questions} questions
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {quiz.duration}
                    </span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {quiz.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Start Quiz
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Tips */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Before You Start</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Review Materials</h3>
                <p className="text-sm text-muted-foreground">
                  Check out our learning center for comprehensive lessons
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Take Your Time</h3>
                <p className="text-sm text-muted-foreground">
                  Read each question carefully before selecting your answer
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Learn from Mistakes</h3>
                <p className="text-sm text-muted-foreground">
                  Review explanations and retake quizzes to improve
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Results View
  if (showResult) {
    const scoreInfo = getScoreMessage()
    const percentage = Math.round((score / sampleQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-10 w-10 text-primary" />
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
              <p className={`text-lg font-medium mb-6 ${scoreInfo.color}`}>
                {scoreInfo.message}
              </p>

              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
                <p className="text-muted-foreground">
                  You got {score} out of {sampleQuestions.length} questions correct
                </p>
              </div>

              {/* Answer Review */}
              <div className="text-left mb-8">
                <h3 className="font-semibold text-foreground mb-4">Answer Review</h3>
                <div className="space-y-3">
                  {sampleQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        answers[idx] === q.correct
                          ? "bg-emerald-50 dark:bg-emerald-950/30"
                          : "bg-red-50 dark:bg-red-950/30"
                      }`}
                    >
                      {answers[idx] === q.correct ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                      )}
                      <span className="text-sm text-foreground line-clamp-1">
                        {idx + 1}. {q.question}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRestartQuiz}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  Take Another Quiz
                </button>
                <Link
                  href="/learn"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz View
  const question = sampleQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / sampleQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">{question.question}</h2>

            <div className="space-y-3 mb-6">
              {question.options.map((option, idx) => {
                let optionClass = "border-border hover:border-primary/50 hover:bg-muted/50"
                if (selectedAnswer !== null) {
                  if (idx === question.correct) {
                    optionClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  } else if (idx === selectedAnswer) {
                    optionClass = "border-red-500 bg-red-50 dark:bg-red-950/30"
                  } else {
                    optionClass = "border-border opacity-50"
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={selectedAnswer !== null}
                    className={`w-full flex items-center gap-4 p-4 border rounded-xl text-left transition-all ${optionClass}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                        selectedAnswer !== null && idx === question.correct
                          ? "bg-emerald-500 text-white"
                          : selectedAnswer === idx
                          ? "bg-red-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-foreground">{option}</span>
                    {selectedAnswer !== null && idx === question.correct && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-auto" />
                    )}
                    {selectedAnswer === idx && idx !== question.correct && (
                      <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {selectedAnswer !== null && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
                <h3 className="font-medium text-foreground mb-2">Explanation</h3>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={handleRestartQuiz}
                className="px-4 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors"
              >
                Exit Quiz
              </button>
              {selectedAnswer !== null && (
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "See Results"}
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
