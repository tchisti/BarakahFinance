import React, { useState, useMemo, useCallback } from 'react';
import { LESSONS } from '../data/lessons';
import GeometricPattern from '../components/GeometricPattern';

// ─── Pull all quiz questions from all lessons ────────────────────────────────
const ALL_QUESTIONS = LESSONS.flatMap(lesson =>
  lesson.quiz.map(q => ({
    ...q,
    lessonTitle: lesson.title,
    lessonIcon: lesson.icon,
    category: lesson.category,
    difficulty: lesson.difficulty,
  }))
);

// Rotating daily tips based on day of year
const DAILY_TIPS = [
  { tip: "Even a small act of Sadaqah every day has immense reward. Start with $1/day — that's $365/year!", verse: "Protect yourself from hellfire even with half a date. — Prophet Muhammad ﷺ (Bukhari)", icon: "💚" },
  { tip: "Check your Zakat today. If your savings have been above the nisab for a full lunar year, it's due.", verse: "Take from their wealth a charity to purify them. — At-Tawbah 9:103", icon: "💎" },
  { tip: "Avoid interest (Riba) in any form — even if it seems small. Small amounts of Riba compound over time.", verse: "Allah will deprive usury of all blessing, but will give increase for deeds of charity. — Al-Baqarah 2:276", icon: "🚫" },
  { tip: "Are you maximizing your TFSA (Canada) or Roth IRA (US) with halal investments? Free tax growth is halal.", verse: "And prepare for tomorrow. — Al-Hashr 59:18", icon: "📈" },
  { tip: "Write or update your Islamic will (wasiyyah) today. The Prophet ﷺ said no Muslim should sleep two nights without one.", verse: "It is prescribed for you, when death approaches one of you, if he leaves wealth, to make a will for parents and near relatives. — Al-Baqarah 2:180", icon: "📜" },
  { tip: "Musharakah and Mudarabah are the most ideal Islamic investment structures — profit AND loss are shared.", verse: "Cooperate in righteousness and piety. — Al-Ma'idah 5:2", icon: "🤝" },
  { tip: "Before buying anything on credit, ask: Is there a halal way to do this? Murabaha-based financing exists for homes, cars, and more.", verse: "O you who believe, fulfill your contracts. — Al-Ma'idah 5:1", icon: "🏠" },
  { tip: "Sadaqah Jariyah (continuous charity) — build something that outlasts you. A well, a school scholarship, or an Islamic library.", verse: "When a person dies, his deeds come to an end except for three. — Prophet Muhammad ﷺ (Muslim)", icon: "🌱" },
  { tip: "Halal stocks must pass activity AND financial screens. Check debt-to-market-cap (< 33%) and non-compliant revenue (< 5%).", verse: "Do not consume one another's wealth unjustly. — An-Nisa 4:29", icon: "📊" },
  { tip: "Is your emergency fund in a halal account? Avoid interest-bearing savings accounts — use a halal current account or commodity murabaha savings.", verse: "And whoever puts his trust in Allah, He is sufficient for him. — At-Talaq 65:3", icon: "🛡️" },
  { tip: "Purify your investment returns: if a halal stock earns 2% from non-compliant sources, donate 2% of your dividends to charity.", verse: "Indeed, Allah loves those who are constantly repentant and loves those who purify themselves. — Al-Baqarah 2:222", icon: "✨" },
  { tip: "The RESP (Canada) is halal as a container — use halal ETFs inside it to save for your children's education tax-efficiently.", verse: "Seeking knowledge is obligatory upon every Muslim. — Prophet Muhammad ﷺ (Ibn Majah)", icon: "📚" },
  { tip: "Takaful (Islamic insurance) works through mutual contribution — seek it out before defaulting to conventional insurance.", verse: "Help one another in goodness and righteousness. — Al-Ma'idah 5:2", icon: "🛡️" },
  { tip: "The Islamic financial system is built on real economic activity. Every transaction should involve a real asset or service.", verse: "Allah has permitted trade and forbidden interest. — Al-Baqarah 2:275", icon: "⚖️" },
  { tip: "Waqf (Islamic endowment) is one of the most powerful community wealth-building tools in Islam. Consider contributing to a waqf fund.", verse: "You will never attain righteousness until you spend from that which you love. — Aal Imran 3:92", icon: "🕌" },
];

// Islamic Finance terms for the daily word
const DAILY_TERMS = [
  { term: "Riba", arabic: "رِبَا", definition: "Interest or usury — any predetermined excess in a loan transaction. Prohibited in Islam.", category: "Prohibited" },
  { term: "Murabaha", arabic: "مُرَابَحَة", definition: "Cost-plus financing — bank buys an asset then sells it at a disclosed markup. The most common Islamic finance contract.", category: "Contracts" },
  { term: "Ijara", arabic: "إِجَارَة", definition: "Islamic leasing — bank owns an asset and leases it to the customer. Ownership may transfer at end of lease.", category: "Contracts" },
  { term: "Musharakah", arabic: "مُشَارَكَة", definition: "Partnership — all parties contribute capital and share profit/loss proportionally. Considered ideal for true risk-sharing.", category: "Contracts" },
  { term: "Mudarabah", arabic: "مُضَارَبَة", definition: "Profit-sharing — one party provides capital, other provides expertise. Profit shared; capital loss borne by investor only.", category: "Contracts" },
  { term: "Sukuk", arabic: "صُكُوك", definition: "Islamic bonds — certificates representing ownership in underlying assets. Returns from asset performance, not interest.", category: "Instruments" },
  { term: "Zakat", arabic: "زَكَاة", definition: "Obligatory annual wealth purification — 2.5% on qualifying assets above nisab held for one lunar year.", category: "Obligations" },
  { term: "Takaful", arabic: "تَكَافُل", definition: "Mutual guarantee — Islamic alternative to insurance. Participants contribute to shared pool; surplus returned to members.", category: "Insurance" },
  { term: "Gharar", arabic: "غَرَر", definition: "Excessive uncertainty or ambiguity in contracts. Prohibited — all material terms must be clearly defined.", category: "Prohibited" },
  { term: "Nisab", arabic: "نِصَاب", definition: "Minimum threshold of wealth above which Zakat becomes obligatory — equivalent to 87.48g gold or 612.36g silver.", category: "Obligations" },
  { term: "Waqf", arabic: "وَقْف", definition: "Islamic endowment — permanently dedicated assets whose returns benefit charitable or religious purposes.", category: "Instruments" },
  { term: "Wasiyyah", arabic: "وَصِيَّة", definition: "Islamic will — a bequest of up to 1/3 of estate to non-heirs or charities before Faraid distribution.", category: "General" },
  { term: "Faraid", arabic: "فَرَائِض", definition: "Fixed Quranic inheritance shares — the mandatory distribution of a Muslim's estate according to An-Nisa 4:11-12.", category: "Obligations" },
  { term: "Qard al-Hasan", arabic: "قَرْضٌ حَسَن", definition: "Benevolent loan — interest-free loan with expectation of principal repayment only. Highly virtuous in Islam.", category: "Contracts" },
  { term: "Istisna", arabic: "اسْتِصْنَاع", definition: "Manufacturing contract — commissioning the production of goods. Payment can be upfront, deferred, or in installments.", category: "Contracts" },
  { term: "Salam", arabic: "بَيْع السَّلَم", definition: "Forward sale — buyer pays full price now for goods delivered in the future. Used for commodities and agriculture.", category: "Contracts" },
  { term: "Purification", arabic: "تَطْهِير", definition: "Donating the non-compliant portion of investment returns to charity. Required when screened stocks earn < 5% from haram sources.", category: "Investing" },
  { term: "Sadaqah Jariyah", arabic: "صَدَقَة جَارِيَة", definition: "Continuous charity — an act whose reward continues after death, such as building a mosque or funding a scholarship.", category: "Obligations" },
];

const DIFFICULTY_COLORS = { Beginner: "#2d5a3f", Intermediate: "#8B6914", Advanced: "#1a3a2a" };

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ChallengesPage({ completedLessons = [] }) {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);

  const dailyTip = DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  const dailyTerm = DAILY_TERMS[dayOfYear % DAILY_TERMS.length];

  // Quiz Challenge state
  const [challengeActive, setChallengeActive] = useState(false);
  const [questionPool, setQuestionPool] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [challengeDone, setChallengeDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [filter, setFilter] = useState('all');

  const startChallenge = useCallback((mode) => {
    let pool = [...ALL_QUESTIONS];
    if (mode === 'beginner') pool = pool.filter(q => q.difficulty === 'Beginner');
    else if (mode === 'intermediate') pool = pool.filter(q => q.difficulty === 'Intermediate');
    else if (mode === 'advanced') pool = pool.filter(q => q.difficulty === 'Advanced');
    else if (mode === 'random') pool = shuffleArray(pool).slice(0, 10);
    else if (mode === 'daily') {
      // Deterministic daily set based on day
      const seed = dayOfYear;
      const sorted = [...ALL_QUESTIONS];
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = (seed * (i + 1)) % (i + 1);
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }
      pool = sorted.slice(0, 5);
    }
    setQuestionPool(shuffleArray(pool).slice(0, 10));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setChallengeDone(false);
    setChallengeActive(true);
  }, [dayOfYear]);

  const answerQuestion = (idx) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === questionPool[currentIdx].answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < questionPool.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selectedAnswer === questionPool[currentIdx].answer ? 1 : 0);
      const pct = finalScore / questionPool.length;
      if (pct >= 0.7) setStreak(s => s + 1);
      else setStreak(0);
      setTotalCompleted(c => c + 1);
      setScore(finalScore);
      setChallengeDone(true);
    }
  };

  const currentQ = questionPool[currentIdx];
  const finalScore = challengeDone ? score : score;

  // Flashcard state
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [flashMode, setFlashMode] = useState(false);
  const flashTerms = useMemo(() => shuffleArray(DAILY_TERMS), []);

  if (challengeActive) {
    if (challengeDone) {
      const pct = finalScore / questionPool.length;
      return (
        <div className="fade-in" style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14, padding: "40px 32px", color: "#f5f0e3", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <GeometricPattern opacity={0.06} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>{pct === 1 ? "🌟" : pct >= 0.7 ? "✅" : "📚"}</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700 }}>
                {pct === 1 ? "MashaAllah! Perfect!" : pct >= 0.7 ? "Excellent Work!" : "Keep Practicing!"}
              </h2>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: "rgba(245,240,227,0.8)", margin: "12px 0" }}>
                {finalScore} / {questionPool.length} correct
              </p>
              <div style={{ background: "rgba(201,185,122,0.2)", borderRadius: 10, padding: "12px 20px", marginTop: 16 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#c9b97a" }}>Current Streak</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#c9b97a" }}>{streak} 🔥</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-secondary" onClick={() => setChallengeActive(false)}>Back to Challenges</button>
            <button className="btn-primary" onClick={() => startChallenge('random')}>New Challenge</button>
          </div>
        </div>
      );
    }

    return (
      <div className="fade-in" style={{ maxWidth: 600, margin: "0 auto" }}>
        <button onClick={() => setChallengeActive(false)} style={{
          background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#1a3a2a", fontWeight: 600, marginBottom: 20, padding: "8px 0"
        }}>← Back</button>

        <div className="card card-pad">
          {/* Progress */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>
              Q{currentIdx + 1}/{questionPool.length}
            </span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: "#1a3a2a" }}>Score: {score}</span>
          </div>
          <div style={{ height: 6, background: "#f0ede3", borderRadius: 3, marginBottom: 16 }}>
            <div style={{ height: "100%", width: `${(currentIdx / questionPool.length) * 100}%`, background: "linear-gradient(90deg, #1a3a2a, #c9b97a)", borderRadius: 3, transition: "width 0.5s" }} />
          </div>

          {/* Lesson context */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 16 }}>{currentQ.lessonIcon}</span>
            <span className="tag tag-gold">{currentQ.category}</span>
            <span className="tag" style={{ background: DIFFICULTY_COLORS[currentQ.difficulty] + "20", color: DIFFICULTY_COLORS[currentQ.difficulty] }}>{currentQ.difficulty}</span>
          </div>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#1a1a1a", marginBottom: 18, lineHeight: 1.4 }}>
            {currentQ.q}
          </h3>

          <div style={{ display: "grid", gap: 10 }}>
            {currentQ.options.map((opt, idx) => {
              const correct = idx === currentQ.answer;
              let bg = "#fff", bd = "1.5px solid #d4d0c8", cl = "#1a1a1a";
              if (showResult && correct) { bg = "#e8f5e9"; bd = "1.5px solid #2d5a3f"; cl = "#1a3a2a"; }
              else if (showResult && idx === selectedAnswer && !correct) { bg = "#fce4ec"; bd = "1.5px solid #c62828"; cl = "#c62828"; }
              return (
                <button key={idx} onClick={() => answerQuestion(idx)} style={{
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
                  {showResult && correct && <span style={{ marginLeft: "auto" }}>✓</span>}
                  {showResult && idx === selectedAnswer && !correct && <span style={{ marginLeft: "auto" }}>✗</span>}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div style={{ marginTop: 16 }}>
              <div style={{ background: selectedAnswer === currentQ.answer ? "#e8f5e9" : "#fff8e1", borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#555", margin: 0 }}>
                  {selectedAnswer === currentQ.answer ? "✅ Correct! " : "❌ The correct answer is: "}{selectedAnswer !== currentQ.answer && <strong>{currentQ.options[currentQ.answer]}</strong>}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <button className="btn-primary" onClick={nextQuestion}>
                  {currentIdx < questionPool.length - 1 ? "Next →" : "Results"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (flashMode) {
    const term = flashTerms[flashIdx];
    return (
      <div className="fade-in" style={{ maxWidth: 540, margin: "0 auto" }}>
        <button onClick={() => setFlashMode(false)} style={{
          background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#1a3a2a", fontWeight: 600, marginBottom: 20, padding: "8px 0"
        }}>← Back to Challenges</button>

        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888", marginBottom: 12, textAlign: "center" }}>
          Card {flashIdx + 1} of {flashTerms.length} · Click card to reveal definition
        </div>

        {/* Flashcard */}
        <div onClick={() => setFlashFlipped(f => !f)} style={{
          background: flashFlipped ? "linear-gradient(135deg, #1a3a2a, #2d5a3f)" : "#fff",
          border: "2px solid #c9b97a", borderRadius: 16, padding: "40px 32px",
          minHeight: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.3s", textAlign: "center", marginBottom: 20,
          boxShadow: "0 4px 20px rgba(26,58,42,0.1)"
        }}>
          {!flashFlipped ? (
            <>
              <span className="tag tag-gold" style={{ marginBottom: 12 }}>{term.category}</span>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#1a3a2a", marginBottom: 8 }}>{term.term}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#c9b97a", fontStyle: "italic" }}>{term.arabic}</div>
              <div style={{ marginTop: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#aaa" }}>Tap to reveal definition</div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#f5f0e3", lineHeight: 1.7 }}>{term.definition}</div>
              <div style={{ marginTop: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "rgba(245,240,227,0.5)" }}>Tap to flip back</div>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn-secondary" onClick={() => { setFlashIdx(i => Math.max(0, i - 1)); setFlashFlipped(false); }} disabled={flashIdx === 0}>← Previous</button>
          <button className="btn-primary" onClick={() => { setFlashIdx(i => Math.min(flashTerms.length - 1, i + 1)); setFlashFlipped(false); }} disabled={flashIdx === flashTerms.length - 1}>Next →</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 14, flexWrap: "wrap" }}>
          {flashTerms.map((_, i) => (
            <div key={i} onClick={() => { setFlashIdx(i); setFlashFlipped(false); }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: i === flashIdx ? "#2d5a3f" : "#d4d0c8", cursor: "pointer" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14,
        padding: "36px 32px", color: "#f5f0e3", marginBottom: 24, position: "relative", overflow: "hidden"
      }}>
        <GeometricPattern opacity={0.05} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 10 }}>Daily Challenges</h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "rgba(245,240,227,0.8)", maxWidth: 480 }}>
              Test your Islamic finance knowledge, learn a new term every day, and keep your streak alive.
            </p>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: "rgba(201,185,122,0.15)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#c9b97a" }}>Streak</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#c9b97a" }}>{streak} 🔥</div>
            </div>
            <div style={{ background: "rgba(201,185,122,0.15)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#c9b97a" }}>Completed</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#c9b97a" }}>{totalCompleted}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Daily Tip */}
          <div className="card card-pad" style={{ marginBottom: 16, background: "#fff8e1", border: "1.5px solid #c9b97a33" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{dailyTip.icon}</span>
              <div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#8B6914", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                  💡 Today's Islamic Finance Tip — {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.7, margin: "0 0 10px" }}>
                  {dailyTip.tip}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: "italic", color: "#c9b97a", margin: 0, borderLeft: "3px solid #c9b97a", paddingLeft: 10 }}>
                  "{dailyTip.verse}"
                </p>
              </div>
            </div>
          </div>

          {/* Daily Word */}
          <div className="card card-pad" style={{ marginBottom: 16, background: "#f0f7f3", border: "1.5px solid #2d5a3f33" }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#2d5a3f", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
              📖 Term of the Day
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#1a3a2a" }}>{dailyTerm.term}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#c9b97a", fontStyle: "italic", marginBottom: 8 }}>{dailyTerm.arabic}</div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.6, margin: 0 }}>{dailyTerm.definition}</p>
              </div>
              <span className="tag tag-gold" style={{ flexShrink: 0, marginLeft: 10 }}>{dailyTerm.category}</span>
            </div>
          </div>

          {/* Learning progress */}
          <div className="card card-pad" style={{ background: "#fff" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 12 }}>Your Progress</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
                <svg width="64" height="64" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
                  <circle cx="32" cy="32" r="27" fill="none" stroke="#f0ede3" strokeWidth="4" />
                  <circle cx="32" cy="32" r="27" fill="none" stroke="#2d5a3f" strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 27}
                    strokeDashoffset={2 * Math.PI * 27 * (1 - completedLessons.length / LESSONS.length)}
                    strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 700, color: "#2d5a3f" }}>
                  {Math.round((completedLessons.length / LESSONS.length) * 100)}%
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a" }}>
                  {completedLessons.length}/{LESSONS.length} Lessons
                </div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888" }}>
                  {LESSONS.length - completedLessons.length} lessons remaining
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {LESSONS.map(l => (
                <div key={l.id} title={l.title} style={{
                  width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                  background: completedLessons.includes(l.id) ? "#e8f5e9" : "#f5f0e3",
                  border: completedLessons.includes(l.id) ? "1.5px solid #2d5a3f" : "1px solid #e8e4dc"
                }}>
                  {l.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Quiz Challenge Modes */}
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 16 }}>
              🎯 Quiz Challenges
            </h3>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { mode: "daily", icon: "📅", title: "Daily Challenge", desc: "5 questions — different set every day", badge: "Today's", badgeColor: "#c9b97a" },
                { mode: "random", icon: "🎲", title: "Random Mix", desc: "10 random questions from all topics", badge: "Popular", badgeColor: "#2d5a3f" },
                { mode: "beginner", icon: "🌙", title: "Foundations", desc: "Beginner-level questions only", badge: "Beginner" },
                { mode: "intermediate", icon: "📈", title: "Building Wealth", desc: "Intermediate-level questions", badge: "Intermediate", badgeColor: "#8B6914" },
                { mode: "advanced", icon: "🎓", title: "Advanced", desc: "Complex contracts and instruments", badge: "Advanced", badgeColor: "#1a3a2a" },
              ].map(({ mode, icon, title, desc, badge, badgeColor }) => (
                <button key={mode} onClick={() => startChallenge(mode)} style={{
                  background: "#fff", border: "1.5px solid #e8e4dc", borderRadius: 12, padding: "14px 16px",
                  cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12,
                  transition: "all 0.2s", fontFamily: "'Source Sans 3', sans-serif"
                }} className="card-hover">
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a3a2a" }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{desc}</div>
                  </div>
                  {badge && (
                    <span style={{
                      background: (badgeColor || "#e8e4dc") + "20", color: badgeColor || "#888",
                      borderRadius: 10, padding: "3px 8px", fontSize: 10, fontWeight: 700, flexShrink: 0
                    }}>{badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Flashcards */}
          <div className="card card-pad" style={{ background: "#f0f7f3", border: "1.5px solid #2d5a3f33" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 8 }}>
              🃏 Flashcard Study
            </h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#555", marginBottom: 14, lineHeight: 1.6 }}>
              {DAILY_TERMS.length} Islamic finance terms — flip cards to test your vocabulary. Perfect for beginners!
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 14 }}>
              {DAILY_TERMS.slice(0, 8).map(t => (
                <div key={t.term} style={{
                  background: "#fff", border: "1px solid #e8e4dc", borderRadius: 6, padding: "6px 8px",
                  textAlign: "center"
                }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, color: "#1a3a2a", fontWeight: 600 }}>{t.term}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#c9b97a" }}>{t.arabic}</div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => { setFlashMode(true); setFlashIdx(0); setFlashFlipped(false); }}
              style={{ width: "100%" }}>
              Start Flashcard Study →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
