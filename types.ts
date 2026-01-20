export type Category = 'roxo' | 'laranja';
export type Mode = 'roxo' | 'laranja' | 'misto';

export interface QuestionData {
  id: string;
  category: Category;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface PreparedQuestion {
  id: string;
  category: Category;
  question: string;
  options: string[]; // Shuffled options
  correctIndex: number; // New index of the correct answer
  originalIndex: number; // Original index for reference
  explanation: string;
}

export interface UserAnswer {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
}

export interface GameState {
  questions: PreparedQuestion[];
  currentIndex: number;
  score: number;
  answers: UserAnswer[];
  isLocked: boolean; // True when user has answered but hasn't clicked next
  selectedOption: number | null;
}

export interface BestScore {
  score: number;
  total: number;
  pct: number;
  at: string;
}

export type BestScoresMap = Record<string, BestScore>;