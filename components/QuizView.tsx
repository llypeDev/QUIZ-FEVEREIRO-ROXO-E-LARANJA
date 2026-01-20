import React, { useEffect, useState } from 'react';
import { GameState, Mode } from '../types';
import { Button } from './Button';
import { ArrowRight, RotateCcw, CheckCircle, XCircle, Info } from 'lucide-react';
import { Modal } from './Modal';

interface QuizViewProps {
  state: GameState;
  mode: Mode;
  totalQuestions: number;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onQuit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  state,
  mode,
  totalQuestions,
  onSelectOption,
  onNext,
  onQuit,
}) => {
  const [showQuitModal, setShowQuitModal] = useState(false);
  const currentQ = state.questions[state.currentIndex];
  const progress = ((state.currentIndex) / totalQuestions) * 100;
  
  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isLocked || showQuitModal) return;
      const key = e.key.toLowerCase();
      const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
      if (typeof map[key] === 'number' && map[key] < currentQ.options.length) {
        onSelectOption(map[key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isLocked, currentQ, onSelectOption, showQuitModal]);

  const ModeBadge = () => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-600">
      {mode === 'misto' ? (
        <div className="flex -space-x-1">
          <div className="w-2.5 h-2.5 rounded-full bg-roxo" />
          <div className="w-2.5 h-2.5 rounded-full bg-laranja" />
        </div>
      ) : (
        <div className={`w-2.5 h-2.5 rounded-full ${mode === 'roxo' ? 'bg-roxo' : 'bg-laranja'}`} />
      )}
      <span className="font-semibold tracking-wide capitalize">{mode === 'roxo' ? 'Fevereiro Roxo' : mode === 'laranja' ? 'Fevereiro Laranja' : 'Misto'}</span>
    </div>
  );

  // Dynamic progress bar color based on mode
  let progressColorClass = "bg-gradient-to-r from-roxo to-laranja";
  if (mode === 'roxo') progressColorClass = "bg-roxo";
  if (mode === 'laranja') progressColorClass = "bg-laranja";

  return (
    <>
      <div className="animate-fade-in w-full max-w-2xl mx-auto">
        {/* Header Info */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex-1 mr-6">
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${progressColorClass}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
           </div>
           <div className="flex items-center gap-3 shrink-0">
             <ModeBadge />
             <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-muted font-mono font-bold">
               {state.currentIndex + 1}<span className="text-gray-300 mx-1">/</span>{totalQuestions}
             </span>
           </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight text-text">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="grid gap-3 mb-8">
          {currentQ.options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = state.selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            const showResult = state.isLocked;

            let btnClass = "border-gray-200 bg-white text-text hover:bg-gray-50 hover:border-gray-300";
            let circleClass = "border-gray-200 bg-gray-50 text-muted";

            if (showResult) {
              if (isCorrect) {
                btnClass = "border-brand bg-brand-subtle text-brand-dark shadow-sm";
                circleClass = "border-brand bg-brand text-white";
              } else if (isSelected) {
                btnClass = "border-red-300 bg-red-50 text-red-700";
                circleClass = "border-red-500 bg-red-500 text-white";
              } else {
                btnClass = "border-gray-100 bg-gray-50 opacity-60";
              }
            } else {
               if (isSelected) {
                 btnClass = "border-brand bg-brand-subtle text-brand-dark ring-1 ring-brand";
                 circleClass = "border-brand text-brand";
               }
            }

            return (
              <button
                key={idx}
                onClick={() => onSelectOption(idx)}
                disabled={state.isLocked}
                className={`relative group w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 shadow-sm ${btnClass} ${!state.isLocked && 'hover:-translate-y-0.5'}`}
              >
                <span className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 text-sm font-bold shrink-0 transition-colors ${circleClass}`}>
                  {letter}
                </span>
                <span className="font-medium text-lg">{opt}</span>
                
                {showResult && isCorrect && (
                  <CheckCircle className="ml-auto text-brand animate-in zoom-in spin-in-12 duration-300" size={24} />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="ml-auto text-red-500 animate-in zoom-in duration-300" size={24} />
                )}
              </button>
            );
          })}
        </div>

        {/* Improved Feedback Pop-up */}
        {state.isLocked && (
          <div className={`mb-8 overflow-hidden rounded-2xl shadow-lg border-l-8 animate-in slide-in-from-bottom-2 fade-in duration-300 ${state.selectedOption === currentQ.correctIndex ? 'bg-white border-brand shadow-brand/10' : 'bg-white border-red-500 shadow-red-500/10'}`}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full shrink-0 ${state.selectedOption === currentQ.correctIndex ? 'bg-brand/10 text-brand' : 'bg-red-100 text-red-600'}`}>
                   {state.selectedOption === currentQ.correctIndex ? <CheckCircle size={28} /> : <Info size={28} />}
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-1 ${state.selectedOption === currentQ.correctIndex ? 'text-brand-dark' : 'text-red-600'}`}>
                    {state.selectedOption === currentQ.correctIndex ? 'Resposta Correta!' : 'Sua resposta está incorreta'}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
            {state.selectedOption !== currentQ.correctIndex && (
               <div className="bg-gray-50 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-t border-gray-100">
                  Resposta Correta: {currentQ.options[currentQ.correctIndex]}
               </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" onClick={() => setShowQuitModal(true)} className="text-xs sm:text-sm">
            <RotateCcw size={16} className="mr-2" />
            Desistir
          </Button>
          
          <Button 
            onClick={onNext} 
            disabled={!state.isLocked}
            className="px-10 shadow-xl shadow-brand/10"
          >
            {state.currentIndex === totalQuestions - 1 ? 'Concluir Quiz' : 'Próxima Pergunta'}
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showQuitModal}
        title="Desistir do Quiz?"
        description="Seu progresso atual será perdido e você voltará para a tela inicial."
        confirmText="Sim, sair"
        cancelText="Continuar jogando"
        type="danger"
        onConfirm={onQuit}
        onCancel={() => setShowQuitModal(false)}
      />
    </>
  );
};