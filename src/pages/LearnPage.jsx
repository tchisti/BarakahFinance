import React, { useState } from 'react';
import { LESSONS, LEARNING_TRACKS } from '../data/lessons';
import GeometricPattern from '../components/GeometricPattern';

const DIFFICULTY_COLORS = {
  Beginner: { bg: "#e8f5e9", color: "#2d5a3f" },
  Intermediate: { bg: "#fff8e1", color: "#8B6914" },
  Advanced: { bg: "#fce4ec", color: "#c62828" }
};

export default function LearnPage({ completedLessons, setCompletedLessons, quizScores, setQuizScores }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [view, setView] = useState('tracks'); // 'tracks' | 'all'
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const startQuiz = () => { setQuizMode(true); setCurrentQ(0); setSelectedAnswer(null); setShowResult(false); setScore(0); };

  const answerQ = (idx) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === activeLesson.quiz[currentQ].answer) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (currentQ < activeLesson.quiz.length - 1) {
      setCurrentQ(c => c + 1); setSelectedAnswer(null); setShowResult(false);
    } else {
      const finalSc = score + (selectedAnswer === activeLesson.quiz[currentQ].answer ? 1 : 0);
      setQuizScores(prev => ({ ...prev, [activeLesson.id]: finalSc }));
      if (!completedLessons.includes(activeLesson.id)) setCompletedLessons(prev => [...prev, activeLesson.id]);
    }
  };

  const quizDone = quizMode && currentQ === activeLesson?.quiz.length - 1 && showResult;
  const finalScore = quizDone ? score + (selectedAnswer === activeLesson.quiz[currentQ].answer ? 1 : 0) : score;

  // ── Individual Lesson View ──────────────────────────────────────────────────
  if (activeLesson) return (
    <div className="fade-in">
      <button onClick={() => { setActiveLesson(null); setQuizMode(false); }} style={{
        background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#1a3a2a", fontWeight: 600, marginBottom: 20, padding: "8px 0"
      }}>← Back to Lessons</button>

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
            {completedLessons.includes(activeLesson.id) && (
              <span style={{ background: "rgba(45,90,63,0.4)", color: "#a5d6a7", borderRadius: 20, padding: "2px 10px", fontSize: 12 }}>✓ Completed</span>
            )}
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
          {/* Reading progress indicator */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {activeLesson.content.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: "#2d5a3f", opacity: 0.3 + (0.7 / activeLesson.content.length) * (i + 1) }} />
            ))}
          </div>

          {activeLesson.content.map((s, i) => (
            <div key={i} className="fade-in card card-pad" style={{ marginBottom: 12, borderLeft: "3px solid #c9b97a" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#1a3a2a", color: "#c9b97a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{i + 1}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 700, color: "#1a3a2a" }}>{s.heading}</h3>
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#444" }}>{s.text}</p>
            </div>
          ))}

          {quizScores[activeLesson.id] !== undefined && (
            <div style={{ background: "#e8f5e9", border: "1.5px solid #2d5a3f", borderRadius: 10, padding: "12px 18px", marginTop: 4, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#1a3a2a" }}>
                Previous score: <strong>{quizScores[activeLesson.id]}/{activeLesson.quiz.length}</strong>
              </span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#2d5a3f" }}>Retake to improve</span>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="btn-primary" onClick={startQuiz} style={{ padding: "14px 40px", fontSize: 16 }}>
              {quizScores[activeLesson.id] !== undefined ? "Retake Quiz →" : "Take the Quiz →"}
            </button>
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
                      display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s"
                    }}>
                      <span style={{
                        width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700,
                        background: showResult && correct ? "#2d5a3f" : showResult && idx === selectedAnswer ? "#c62828" : "#f5f0e3",
                        color: showResult && (correct || idx === selectedAnswer) ? "#fff" : "#1a3a2a"
                      }}>{String.fromCharCode(65 + idx)}</span>
                      {opt}
                      {showResult && correct && <span style={{ marginLeft: "auto", color: "#2d5a3f" }}>✓</span>}
                    </button>
                  );
                })}
              </div>
              {showResult && (
                <div style={{ textAlign: "right", marginTop: 18 }}>
                  <button className="btn-primary" onClick={nextQ}>{currentQ < activeLesson.quiz.length - 1 ? "Next →" : "Results"}</button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>{finalScore === activeLesson.quiz.length ? "🌟" : finalScore >= 2 ? "✅" : "📚"}</div>
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

  // ── Lesson List View ─────────────────────────────────────────────────────────
  const categories = ['All', ...new Set(LESSONS.map(l => l.category))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLessons = LESSONS.filter(l => {
    if (filterDifficulty !== 'All' && l.difficulty !== filterDifficulty) return false;
    if (filterCategory !== 'All' && l.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Islamic Finance Academy</h2>
        <p className="section-desc">14 courses from foundations to advanced — with North American context and interactive quizzes.</p>
      </div>

      {/* Overall Progress */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 12, padding: "22px 24px",
        marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", color: "#f5f0e3",
        flexWrap: "wrap", gap: 16
      }}>
        <div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#c9b97a", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Overall Progress</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
            {completedLessons.length}/{LESSONS.length} Lessons Completed
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {LEARNING_TRACKS.map(track => {
              const trackCompleted = track.lessonIds.filter(id => completedLessons.includes(id)).length;
              return (
                <div key={track.id} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 10px" }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(245,240,227,0.7)" }}>
                    {track.icon} {trackCompleted}/{track.lessonIds.length}
                  </span>
                </div>
              );
            })}
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

      {/* View Toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "2px solid #e8e4dc" }}>
        {[
          { id: 'tracks', label: '🗺️ Learning Paths' },
          { id: 'all', label: '📚 All Lessons' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setView(tab.id)} style={{
            padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600,
            color: view === tab.id ? "#1a3a2a" : "#888",
            borderBottom: view === tab.id ? "2px solid #2d5a3f" : "2px solid transparent",
            marginBottom: -2
          }}>{tab.label}</button>
        ))}
      </div>

      {/* ── LEARNING TRACKS VIEW ── */}
      {view === 'tracks' && (
        <div style={{ display: "grid", gap: 24 }}>
          {LEARNING_TRACKS.map(track => {
            const trackLessons = LESSONS.filter(l => track.lessonIds.includes(l.id));
            const trackCompleted = track.lessonIds.filter(id => completedLessons.includes(id)).length;
            const trackPct = (trackCompleted / track.lessonIds.length) * 100;
            return (
              <div key={track.id}>
                {/* Track header */}
                <div style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}cc)`, borderRadius: 12, padding: "20px 24px", color: "#f5f0e3", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 24 }}>{track.icon}</span>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700 }}>{track.name}</h3>
                      </div>
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "rgba(245,240,227,0.75)", margin: 0 }}>{track.description}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700 }}>{trackCompleted}/{track.lessonIds.length}</div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, opacity: 0.7 }}>completed</div>
                    </div>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginTop: 14 }}>
                    <div style={{ height: "100%", width: `${trackPct}%`, background: "#c9b97a", borderRadius: 2, transition: "width 0.5s" }} />
                  </div>
                </div>

                {/* Track lessons */}
                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                  {trackLessons.map((l, idx) => {
                    const done = completedLessons.includes(l.id);
                    const sc = quizScores[l.id];
                    const dc = DIFFICULTY_COLORS[l.difficulty];
                    return (
                      <div key={l.id} className="card-hover" onClick={() => setActiveLesson(l)} style={{
                        background: "#fff", borderRadius: 12, padding: "20px",
                        border: done ? "1.5px solid #2d5a3f" : "1px solid #e8e4dc",
                        cursor: "pointer", position: "relative", display: "flex", gap: 12
                      }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: done ? "#e8f5e9" : "#f5f0e3", display: "flex", alignItems: "center", justifyContent: "center", border: done ? "2px solid #2d5a3f" : "1px solid #e8e4dc", fontSize: 18 }}>
                            {done ? "✓" : l.icon}
                          </div>
                          {idx < trackLessons.length - 1 && <div style={{ width: 2, height: 20, background: done ? "#2d5a3f" : "#e8e4dc" }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                            <span style={{ background: dc.bg, color: dc.color, borderRadius: 10, padding: "2px 8px", fontSize: 10, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>{l.difficulty}</span>
                          </div>
                          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a3a2a", margin: "0 0 4px" }}>{l.title}</h4>
                          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#999", margin: 0 }}>
                            {l.duration}{sc !== undefined ? ` · Quiz: ${sc}/${l.quiz.length}` : ""}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── ALL LESSONS VIEW ── */}
      {view === 'all' && (
        <div>
          {/* Filters */}
          <div style={{ marginBottom: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Difficulty</div>
              <div style={{ display: "flex", gap: 6 }}>
                {difficulties.map(d => (
                  <button key={d} onClick={() => setFilterDifficulty(d)} style={{
                    padding: "5px 12px", borderRadius: 20, border: "1.5px solid",
                    borderColor: filterDifficulty === d ? "#2d5a3f" : "#d4d0c8",
                    background: filterDifficulty === d ? "#e8f5e9" : "#fff",
                    color: filterDifficulty === d ? "#1a3a2a" : "#666",
                    cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600
                  }}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Category</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setFilterCategory(c)} style={{
                    padding: "5px 12px", borderRadius: 20, border: "1.5px solid",
                    borderColor: filterCategory === c ? "#c9b97a" : "#d4d0c8",
                    background: filterCategory === c ? "#fff8e1" : "#fff",
                    color: filterCategory === c ? "#8B6914" : "#666",
                    cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600
                  }}>{c}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888", marginBottom: 12 }}>
            Showing {filteredLessons.length} of {LESSONS.length} lessons
          </div>

          {/* Lesson Cards Grid */}
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {filteredLessons.map(l => {
              const done = completedLessons.includes(l.id);
              const sc = quizScores[l.id];
              const dc = DIFFICULTY_COLORS[l.difficulty];
              return (
                <div key={l.id} className="card-hover" onClick={() => setActiveLesson(l)} style={{
                  background: "#fff", borderRadius: 14, padding: "24px 20px",
                  border: done ? "1.5px solid #2d5a3f" : "1px solid #e8e4dc",
                  cursor: "pointer", position: "relative", overflow: "hidden"
                }}>
                  {done && <div style={{ position: "absolute", top: 10, right: 10, background: "#2d5a3f", color: "#fff", borderRadius: 14, padding: "3px 10px", fontSize: 10, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>✓ Done</div>}
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{l.icon}</div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                    <span className="tag tag-gold">{l.category}</span>
                    <span style={{ background: dc.bg, color: dc.color, borderRadius: 10, padding: "2px 8px", fontSize: 10, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>{l.difficulty}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700, color: "#1a3a2a", marginBottom: 6 }}>{l.title}</h3>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#999" }}>
                    {l.duration}{sc !== undefined ? " · Quiz: " + sc + "/" + l.quiz.length : ""}
                  </p>
                  {sc === l.quiz.length && (
                    <div style={{ position: "absolute", bottom: 10, right: 10, fontSize: 16 }}>🌟</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
