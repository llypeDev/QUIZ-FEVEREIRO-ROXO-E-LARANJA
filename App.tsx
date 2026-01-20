import React, { useState, useEffect } from 'react';
import { 
  Mode, 
  QuestionData, 
  PreparedQuestion, 
  GameState, 
  BestScoresMap,
  UserAnswer
} from './types';
import { QUESTION_BANK, STORAGE_KEY } from './constants';
import { HomeView } from './components/HomeView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';

// Helper: Shuffle Array
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Helper: Prepare Questions for a session (shuffle options)
function prepareGame(mode: Mode, count: number): PreparedQuestion[] {
  let pool = QUESTION_BANK;
  if (mode === 'roxo') pool = pool.filter(q => q.category === 'roxo');
  if (mode === 'laranja') pool = pool.filter(q => q.category === 'laranja');
  
  // Shuffle questions
  const selectedRaw = shuffleArray(pool).slice(0, Math.max(1, Math.min(count, pool.length)));
  
  return selectedRaw.map(q => {
    // Create paired options with original index
    const paired = q.options.map((text, idx) => ({ text, originalIdx: idx }));
    // Shuffle options
    const shuffledOpts = shuffleArray(paired);
    
    return {
      id: q.id,
      category: q.category,
      question: q.question,
      options: shuffledOpts.map(o => o.text),
      correctIndex: shuffledOpts.findIndex(o => o.originalIdx === q.answerIndex),
      originalIndex: q.answerIndex,
      explanation: q.explanation
    };
  });
}

function App() {
  const [screen, setScreen] = useState<'home' | 'quiz' | 'result'>('home');
  const [mode, setMode] = useState<Mode>('misto');
  const [count, setCount] = useState<number>(15);
  const [bestScores, setBestScores] = useState<BestScoresMap>({});
  const [userName, setUserName] = useState<string>('');

  // Game State
  const [gameState, setGameState] = useState<GameState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    answers: [],
    isLocked: false,
    selectedOption: null
  });

  // Load scores on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBestScores(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading scores", e);
    }
  }, []);

  // Save scores
  const saveScore = (newScore: number, total: number) => {
    const key = `${mode}:${count}`;
    const pct = Math.round((newScore / total) * 100);
    const prev = bestScores[key];

    if (!prev || newScore > prev.score || (newScore === prev.score && pct > prev.pct)) {
      const newMap = {
        ...bestScores,
        [key]: { score: newScore, total, pct, at: new Date().toISOString() }
      };
      setBestScores(newMap);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
    }
  };

  const handleStart = () => {
    if (!userName.trim()) {
      alert("Por favor, digite seu nome para começar.");
      return;
    }
    const questions = prepareGame(mode, count);
    setGameState({
      questions,
      currentIndex: 0,
      score: 0,
      answers: [],
      isLocked: false,
      selectedOption: null
    });
    setScreen('quiz');
  };

  const handleOptionSelect = (idx: number) => {
    if (gameState.isLocked) return;

    const currentQ = gameState.questions[gameState.currentIndex];
    const isCorrect = idx === currentQ.correctIndex;
    
    const newAnswer: UserAnswer = {
      questionId: currentQ.id,
      selectedIndex: idx,
      correctIndex: currentQ.correctIndex,
      isCorrect
    };

    setGameState(prev => ({
      ...prev,
      isLocked: true,
      selectedOption: idx,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, newAnswer]
    }));
  };

  const handleNext = () => {
    const isLast = gameState.currentIndex === gameState.questions.length - 1;
    
    if (isLast) {
      saveScore(gameState.score, gameState.questions.length);
      setScreen('result');
    } else {
      setGameState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        isLocked: false,
        selectedOption: null
      }));
    }
  };

  const handleQuit = () => {
    if (window.confirm("Sair do quiz e voltar ao início?")) {
      setScreen('home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background font-sans">
      <div className="w-full max-w-4xl relative z-10">
        {/* Top Bar */}
        <div className="flex flex-col items-center justify-center mb-8 gap-2 text-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
              <span className="text-gray-800">Fevereiro</span>{' '}
              <span className="text-roxo">Roxo</span>{' '}
              <span className="text-gray-300 font-light">&</span>{' '}
              <span className="text-laranja">Laranja</span>
            </h1>
            <p className="text-sm text-muted font-medium tracking-wide uppercase">Campanha de Conscientização</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card card-shadow rounded-3xl overflow-hidden p-5 sm:p-8 md:p-10 transition-all duration-500">
          {screen === 'home' && (
            <HomeView 
              mode={mode} 
              setMode={setMode} 
              count={count} 
              setCount={setCount} 
              bestScores={bestScores} 
              userName={userName}
              setUserName={setUserName}
              onStart={handleStart} 
            />
          )}
          
          {screen === 'quiz' && (
            <QuizView 
              state={gameState}
              mode={mode}
              totalQuestions={gameState.questions.length}
              onSelectOption={handleOptionSelect}
              onNext={handleNext}
              onQuit={handleQuit}
            />
          )}

          {screen === 'result' && (
             <ResultView 
                state={gameState}
                mode={mode}
                userName={userName}
                onRestart={handleStart}
                onHome={() => setScreen('home')}
             />
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-semibold cursor-default px-4">
            Conteúdo Educativo • Consulte sempre um médico
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;