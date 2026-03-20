import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Zap, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
  Timer
} from 'lucide-react';

interface TimeLevel {
  spanish: string;
  targetHour: number;
  targetMinute: number;
  translation: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
}

const LEVELS: TimeLevel[] = [
  {
    spanish: "Es la una en punto",
    targetHour: 1,
    targetMinute: 0,
    translation: "Ժամը մեկն է (ճիշտ):",
    period: 'afternoon'
  },
  {
    spanish: "Son las tres y media",
    targetHour: 3,
    targetMinute: 30,
    translation: "Ժամը երեքն անց կես է:",
    period: 'afternoon'
  },
  {
    spanish: "Son las cinco y cuarto",
    targetHour: 5,
    targetMinute: 15,
    translation: "Ժամը հինգն անց քառորդ է:",
    period: 'afternoon'
  },
  {
    spanish: "Son las ocho y diez",
    targetHour: 8,
    targetMinute: 10,
    translation: "Ժամը ութն անց տաս է:",
    period: 'morning'
  },
  {
    spanish: "Son las diez menos cuarto",
    targetHour: 9,
    targetMinute: 45,
    translation: "Տասին քառորդ է պակաս:",
    period: 'evening'
  },
  {
    spanish: "Son las doce en punto",
    targetHour: 12,
    targetMinute: 0,
    translation: "Ժամը տասներկուսն է (ճիշտ):",
    period: 'morning'
  },
  {
    spanish: "Son las siete y veinte",
    targetHour: 7,
    targetMinute: 20,
    translation: "Ժամը յոթն անց քսան է:",
    period: 'evening'
  },
  {
    spanish: "Son las once menos veinte",
    targetHour: 10,
    targetMinute: 40,
    translation: "Տասնմեկին քսան է պակաս:",
    period: 'night'
  }
];

export default function TimeGame() {
  const [index, setIndex] = useState(0);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentLevel = LEVELS[index];

  useEffect(() => {
    setHour(12);
    setMinute(0);
    setFeedback(null);
  }, [index]);

  const adjustHour = (delta: number) => {
    if (feedback) return;
    setHour(prev => {
      let next = prev + delta;
      if (next > 12) return 1;
      if (next < 1) return 12;
      return next;
    });
  };

  const adjustMinute = (delta: number) => {
    if (feedback) return;
    setMinute(prev => {
      let next = prev + delta;
      if (next >= 60) return 0;
      if (next < 0) return 55;
      return next;
    });
  };

  const checkAnswer = () => {
    if (hour === currentLevel.targetHour && minute === currentLevel.targetMinute) {
      setScore(s => s + 1);
      setFeedback({ isCorrect: true, message: 'Ճիշտ է: Ժամանակի վարպետ:' });
    } else {
      setFeedback({ 
        isCorrect: false, 
        message: `Սխալ է: Պետք էր լիներ ${currentLevel.targetHour}:${currentLevel.targetMinute === 0 ? '00' : currentLevel.targetMinute}` 
      });
    }
  };

  const nextQuestion = () => {
    if (index < LEVELS.length - 1) {
      setIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setIsFinished(false);
    setHour(12);
    setMinute(0);
    setFeedback(null);
  };

  // Analog Clock SVG Logic
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans text-white">
        <div className="max-w-2xl w-full bg-slate-800 rounded-[48px] p-12 md:p-20 border-8 border-slate-700 shadow-2xl text-center space-y-12">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-cyan-500 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/30 mb-8">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tight">Առաքելությունն ավարտված է:</h2>
            <p className="text-2xl text-slate-400 font-medium">
              Դուք կառավարեցիք ժամանակը <br/>
              <span className="text-cyan-400 font-black text-4xl">{score} / {LEVELS.length}</span> միավորով:
            </p>
          </div>

          <button 
            onClick={reset}
            className="w-full py-6 bg-cyan-600 text-white rounded-[32px] font-black text-2xl shadow-xl hover:bg-cyan-700 transition-all active:scale-95 flex items-center justify-center gap-4"
          >
            ՍԿՍԵԼ ՆՈՐԻՑ
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-cyan-500/30 pb-20 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />

      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b-2 border-slate-800 p-6 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Timer className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight leading-none">ԺԱՄԱՆԱԿԻ ՄԵՔԵՆԱ</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-xs font-black text-slate-500 uppercase tracking-widest">
              ՄԻԱՎՈՐ: <span className="text-cyan-400">{score}</span>
            </div>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{ width: `${((index + 1) / LEVELS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Instructions & Target */}
        <div className="space-y-8">
          <div className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-cyan-500/20">
            ՄԱԿԱՐԴԱԿ {index + 1} / {LEVELS.length}
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Տեղադրիր ժամանակը՝</p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight italic">
                «{currentLevel.spanish}»
              </h2>
            </div>
          </div>

          {/* Period Indicator */}
          <div className="flex items-center gap-4 p-4 bg-slate-900/30 rounded-2xl w-fit border border-slate-800">
            {currentLevel.period === 'morning' || currentLevel.period === 'afternoon' ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-indigo-400" />
            )}
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              {currentLevel.period === 'morning' ? 'Առավոտ' : 
               currentLevel.period === 'afternoon' ? 'Ցերեկ' : 
               currentLevel.period === 'evening' ? 'Երեկո' : 'Գիշեր'}
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Clock */}
        <div className="flex flex-col items-center gap-12">
          {/* Analog Clock Visual */}
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl" />
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              {/* Face */}
              <circle cx="50" cy="50" r="48" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="0.5 23.05" />
              
              {/* Hour Markers */}
              {[...Array(12)].map((_, i) => (
                <line 
                  key={i}
                  x1="50" y1="8" x2="50" y2="12" 
                  transform={`rotate(${i * 30} 50 50)`} 
                  stroke={i % 3 === 0 ? "#06b6d4" : "#475569"} 
                  strokeWidth={i % 3 === 0 ? "1.5" : "1"} 
                />
              ))}

              {/* Hour Hand */}
              <line 
                x1="50" y1="50" x2="50" y2="25" 
                stroke="#06b6d4" strokeWidth="3" strokeLinecap="round"
                transform={`rotate(${hourAngle} 50 50)`}
                className="transition-transform duration-500 ease-out"
              />
              
              {/* Minute Hand */}
              <line 
                x1="50" y1="50" x2="50" y2="15" 
                stroke="#f8fafc" strokeWidth="2" strokeLinecap="round"
                transform={`rotate(${minuteAngle} 50 50)`}
                className="transition-transform duration-500 ease-out"
              />
              
              {/* Center Dot */}
              <circle cx="50" cy="50" r="3" fill="#06b6d4" />
            </svg>
          </div>

          {/* Digital Controls */}
          <div className="space-y-8 w-full max-w-sm">
            <div className="flex items-center justify-center gap-8">
              {/* Hour Control */}
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={() => adjustHour(1)}
                  className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <ArrowRight className="w-6 h-6 -rotate-90" />
                </button>
                <div className="w-20 h-24 bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <span className="text-4xl font-black font-mono text-cyan-400">{hour}</span>
                </div>
                <button 
                  onClick={() => adjustHour(-1)}
                  className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ԺԱՄ</span>
              </div>

              <div className="text-4xl font-black text-slate-700 mb-8">:</div>

              {/* Minute Control */}
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={() => adjustMinute(5)}
                  className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <ArrowRight className="w-6 h-6 -rotate-90" />
                </button>
                <div className="w-20 h-24 bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <span className="text-4xl font-black font-mono text-cyan-400">
                    {minute < 10 ? `0${minute}` : minute}
                  </span>
                </div>
                <button 
                  onClick={() => adjustMinute(-5)}
                  className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ՐՈՊԵ</span>
              </div>
            </div>

            {/* Action Button */}
            {!feedback ? (
              <button
                onClick={checkAnswer}
                className="w-full py-6 bg-cyan-600 text-white rounded-[32px] font-black text-2xl shadow-xl hover:bg-cyan-700 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                ՀԱՍՏԱՏԵԼ
                <Zap className="w-6 h-6 fill-current" />
              </button>
            ) : (
              <div className={`p-6 rounded-[32px] flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 ${feedback.isCorrect ? 'bg-emerald-500/10 border-2 border-emerald-500/20' : 'bg-rose-500/10 border-2 border-rose-500/20'}`}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex items-center gap-4">
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    ) : (
                      <XCircle className="w-8 h-8 text-rose-500" />
                    )}
                    <p className={`text-xl font-black uppercase tracking-tight ${feedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {feedback.isCorrect ? 'ՃԻՇՏ Է:' : 'ՍԽԱԼ Է:'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-white opacity-90 italic">
                      «{currentLevel.translation}»
                    </p>
                    <p className={`text-sm font-medium ${feedback.isCorrect ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
                      {feedback.message}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={nextQuestion}
                  className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  {index < LEVELS.length - 1 ? 'ՀԱՋՈՐԴԸ' : 'ԱՎԱՐՏԵԼ'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center mt-12">
        <div className="flex items-center justify-center gap-2 text-slate-700 font-black uppercase tracking-[0.5em] text-[10px]">
          <Sparkles className="w-4 h-4" />
          <Sparkles className="w-4 h-4" />
        </div>
      </footer>
    </div>
  );
}
