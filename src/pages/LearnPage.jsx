import React, { useState } from 'react';
import { LESSONS } from '../data/lessons';
import GeometricPattern from '../components/GeometricPattern';

export default function LearnPage({ completedLessons, setCompletedLessons, quizScores, setQuizScores }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => { setQuizMode(true); setCurrentQ(0); setSelectedAnswer(null); setShowResult(false); setScore(0); };
  const answerQ = (idx) => { if (showResult) return; setSelectedAnswer(idx); setShowResult(true); if (idx === activeLesson.quiz[currentQ].answer) setScore(s => s + 1); };
  const nextQ = () => {
    if (currentQ < activeLesson.quiz.length - 1) { setCurrentQ(c => c + 1); setSelectedAnswer(null); setShowResult(false); }
    else { setQuizScores(prev => ({ ...prev, [activeLesson.id]: score + (selectedAnswer === activeLesson.quiz[currentQ].answer ? 1 : 0) })); if (!completedLessons.includes(activeLesson.id)) setCompletedLessons(prev => [...prev, activeLesson.id]); }
  };
  const quizDone = quizMode && currentQ === activeLesson?.quiz.length - 1 && showResult;
  const finalScore = quizDone ? score + (selectedAnswer === activeLesson.quiz[currentQ].answer ? 1 : 0) : score;

  if (activeLesson) return (
    <div className="fade-in">
      <button onClick={() => { setActiveLesson(null); setQuizMode(false); }} style={{
        background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#1a3a2a", fontWeight: 600, marginBottom: 20, padding: "8px 0"
      }}>{"\u2190"} Back to Lessons</button>

      {/* Lesson Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14, padding: "36px 32px",
        color: "#f5f0e3", marginBottom: 24, position: "relative", overflow: "hidden"
      }}>
        <GeometricPattern opacity={0.05} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <span className="tag" style={{ background: "rgba(201,185,122,0.2)", color: "#c9b97a" }}>{activeLesson.category}</span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "rgba(245,240,227,0.6)" }}>
              {activeLesson.duration} · {activeLesson.difficulty}
            </span>
          </div>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{activeLesson.icon}</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 14 }}>{activeLesson.title}</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "#c9b97a", lineHeight: 1.6 }}>
            "{activeLesson.verse}"
          </p>
        </div>
      </div>

      {!quizMode ? (
        <>
          {activeLesson.content.map((s, i) => (
            <div key={i} className="fade-in card card-pad" style={{ marginBottom: 12 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 700, color: "#1a3a2a", marginBottom: 10 }}>{s.heading}</h3>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#444" }}>{s.text}</p>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="btn-primary" onClick={startQuiz} style={{ padding: "14px 40px", fontSize: 16 }}>Take the Quiz {"\u2192"}</button>
          </div>
        </>
      ) : (
        <div className="fade-in card card-pad">
          {!quizDone ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>
                  Q{currentQ + 1}/{activeLesson.quiz.length}
                </span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#1a3a2a" }}>Score: {score}</span>
              </div>
              <div style={{ height: 4, background: "#eee", borderRadius: 2, marginBottom: 22 }}>
                <div style={{ height: "100%", width: (currentQ / activeLesson.quiz.length) * 100 + "%", background: "linear-gradient(90deg, #1a3a2a, #c9b97a)", borderRadius: 2, transition: "width 0.5s" }} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#1a1a1a", marginBottom: 18, lineHeight: 1.4 }}>
                {activeLesson.quiz[currentQ].q}
              </h3>
              <div style={{ display: "grid", gap: 10 }}>
                {activeLesson.quiz[currentQ].options.map((opt, idx) => {
                  const correct = idx === activeLesson.quiz[currentQ].answer;
                  let bg = "#fff", bd = "1.5px solid #d4d0c8", cl = "#1a1a1a";
                  if (showResult && correct) { bg = "#e8f5e9"; bd = "1.5px solid #2d5a3f"; cl = "#1a3a2a"; }
                  else if (showResult && idx === selectedAnswer) { bg = "#fce4ec"; bd = "1.5px solid #c62828"; cl = "#c62828"; }
                  else if (idx === selectedAnswer) { bg = "#f0ede3"; bd = "1.5px solid #c9b97a"; }
                  return (
                    <button key={idx} onClick={() => answerQ(idx)} style={{
                      background: bg, border: bd, color: cl, borderRadius: 10, padding: "14px 16px",
                      textAlign: "left", cursor: showResult ? "default" : "pointer",
                      fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 500,
                      display: "flex", alignItems: "center", gap: 12
                    }}>
                      <span style={{
                        width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700,
                        background: showResult && correct ? "#2d5a3f" : showResult && idx === selectedAnswer ? "#c62828" : "#f5f0e3",
                        color: showResult && (correct || idx === selectedAnswer) ? "#fff" : "#1a3a2a"
                      }}>{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showResult && (
                <div style={{ textAlign: "right", marginTop: 18 }}>
                  <button className="btn-primary" onClick={nextQ}>{currentQ < activeLesson.quiz.length - 1 ? "Next \u2192" : "Results"}</button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>{finalScore === activeLesson.quiz.length ? "\u{1F31F}" : finalScore >= 2 ? "\u2705" : "\u{1F4DA}"}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#1a3a2a", marginBottom: 8 }}>
                {finalScore === activeLesson.quiz.length ? "MashaAllah! Perfect!" : finalScore >= 2 ? "Great Job!" : "Keep Learning!"}
              </h3>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: "#666", marginBottom: 24 }}>
                Score: {finalScore} / {activeLesson.quiz.length}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn-secondary" onClick={() => setQuizMode(false)}>Review Lesson</button>
                <button className="btn-primary" onClick={() => { setActiveLesson(null); setQuizMode(false); }}>All Lessons</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Lesson List
  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Islamic Finance 101</h2>
        <p className="section-desc">From foundations to advanced concepts — with North American context.</p>
      </div>

      {/* Progress */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 12, padding: "22px 24px",
        marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", color: "#f5f0e3"
      }}>
        <div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#c9b97a", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Progress</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            {completedLessons.length}/{LESSONS.length} Completed
          </div>
        </div>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "#c9b97a",
          position: "relative", flexShrink: 0
        }}>
          <svg width="64" height="64" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
            <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(201,185,122,0.2)" strokeWidth="3" />
            <circle cx="32" cy="32" r="27" fill="none" stroke="#c9b97a" strokeWidth="3"
              strokeDasharray={2 * Math.PI * 27}
              strokeDashoffset={2 * Math.PI * 27 * (1 - completedLessons.length / LESSONS.length)}
              strokeLinecap="round" className="progress-ring" />
          </svg>
          {Math.round((completedLessons.length / LESSONS.length) * 100)}%
        </div>
      </div>

      {/* Lesson Cards */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {LESSONS.map(l => {
          const done = completedLessons.includes(l.id);
          const sc = quizScores[l.id];
          return (
            <div key={l.id} className="card-hover" onClick={() => setActiveLesson(l)} style={{
              background: "#fff", borderRadius: 14, padding: "24px 20px",
              border: done ? "1.5px solid #2d5a3f" : "1px solid #e8e4dc",
              cursor: "pointer", position: "relative", overflow: "hidden"
            }}>
              {done && <div style={{ position: "absolute", top: 10, right: 10, background: "#2d5a3f", color: "#fff", borderRadius: 14, padding: "3px 10px", fontSize: 10, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>{"\u2713"}</div>}
              <div style={{ fontSize: 28, marginBottom: 10 }}>{l.icon}</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                <span className="tag tag-gold">{l.category}</span>
                <span className="tag tag-green">{l.difficulty}</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700, color: "#1a3a2a", marginBottom: 6 }}>{l.title}</h3>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#999" }}>
                {l.duration}{sc !== undefined ? " · " + sc + "/" + l.quiz.length : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
