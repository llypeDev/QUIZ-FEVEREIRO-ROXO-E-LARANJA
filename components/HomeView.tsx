import React, { useState } from 'react';
import { Mode, BestScoresMap } from '../types';
import { Button } from './Button';
import { Play, Trophy, User, Gift, AlertCircle } from 'lucide-react';

interface HomeViewProps {
  mode: Mode;
  setMode: (m: Mode) => void;
  count: number;
  setCount: (c: number) => void;
  bestScores: BestScoresMap;
  userName: string;
  setUserName: (n: string) => void;
  onStart: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  mode,
  setMode,
  count,
  setCount,
  bestScores,
  userName,
  setUserName,
  onStart,
}) => {
  const [nameError, setNameError] = useState(false);
  
  const getBestScore = (m: Mode, c: number) => {
    const key = `${m}:${c}`;
    return bestScores[key];
  };

  const handleStartClick = () => {
    if (!userName.trim()) {
      setNameError(true);
      // Shake animation or focus could be added here
      return;
    }
    onStart();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    if (nameError && e.target.value.trim()) {
      setNameError(false);
    }
  };

  const isPromoEligible = mode === 'misto' && count === 15;

  const renderBestScoreRow = (m: Mode) => {
    const score = getBestScore(m, count);
    const label = m === 'roxo' ? 'Fev. Roxo' : m === 'laranja' ? 'Fev. Laranja' : 'Misto';
    
    // Semantic colors for the dots
    const dotClass = m === 'roxo' ? 'bg-roxo' : m === 'laranja' ? 'bg-laranja' : 'bg-gray-400';
    
    return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm hover:bg-white hover:shadow-sm transition-all">
        <div className="flex items-center gap-3">
           {m === 'misto' ? (
             <div className="flex -space-x-1.5">
               <div className="w-3 h-3 rounded-full bg-roxo ring-2 ring-white" />
               <div className="w-3 h-3 rounded-full bg-laranja ring-2 ring-white" />
             </div>
           ) : (
             <div className={`w-3 h-3 rounded-full ${dotClass} ring-2 ring-white`} />
           )}
           <span className="text-gray-700 font-medium">{label}</span>
        </div>
        <span className="font-bold text-brand bg-brand-subtle px-3 py-1 rounded-md text-xs">
          {score ? `${score.score}/${score.total} (${score.pct}%)` : '—'}
        </span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {/* Settings Column */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-text tracking-tight">
            Teste seus conhecimentos
          </h2>
          <p className="text-muted text-sm leading-relaxed border-l-4 border-brand pl-4 py-1">
            O objetivo é <strong>informar</strong> e <strong>estimular o cuidado</strong>. 
            Se você ou alguém próximo tem sintomas persistentes, procure um serviço de saúde.
          </p>
        </div>

        {/* Name Input */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-muted font-bold flex justify-between">
            Seu Nome
            {nameError && <span className="text-red-500 flex items-center gap-1"><AlertCircle size={12}/> Obrigatório</span>}
          </label>
          <div className="relative">
            <input 
              type="text"
              value={userName}
              onChange={handleNameChange}
              placeholder="Digite seu nome..."
              className={`w-full bg-white border text-text rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-1 font-medium shadow-sm transition-colors ${nameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-brand focus:ring-brand hover:border-gray-300'}`}
            />
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${nameError ? 'text-red-500' : 'text-muted'}`}>
              <User size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-muted font-bold">Tema do Quiz</label>
          <div className="flex p-1.5 rounded-2xl bg-gray-100 border border-gray-200">
            {(['roxo', 'laranja', 'misto'] as Mode[]).map((m) => {
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-brand shadow-sm scale-[1.02]' 
                      : 'text-muted hover:text-gray-900'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-muted font-bold">
            Quantidade de Perguntas
          </label>
          <div className="relative">
            <select 
              value={count} 
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full bg-white border border-gray-200 text-text rounded-xl px-4 py-4 outline-none focus:border-brand focus:ring-1 focus:ring-brand appearance-none font-semibold cursor-pointer shadow-sm hover:border-gray-300 transition-colors"
            >
              <option value="5">5 perguntas</option>
              <option value="10">10 perguntas</option>
              <option value="15">15 perguntas</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        {isPromoEligible && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200/60 rounded-xl p-4 flex gap-4 items-start animate-fade-in shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-orange-100 w-16 h-16 rounded-full blur-2xl opacity-50"></div>
            <div className="p-2.5 bg-white rounded-xl text-orange-500 shadow-sm shrink-0 border border-orange-100">
              <Gift size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative z-10">
              <h4 className="font-bold text-orange-800 text-sm mb-1 flex items-center gap-1">
                Sorteio Especial
                <span className="bg-orange-100 text-[10px] px-1.5 py-0.5 rounded text-orange-600 uppercase">Novo</span>
              </h4>
              <p className="text-xs text-orange-700/90 leading-relaxed font-medium">
                Responda as 15 perguntas e <span className="underline decoration-orange-300 underline-offset-2">compartilhe seu resultado</span> para concorrer a um <strong>Kit Quero Estar-Bem</strong>!
              </p>
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button 
            onClick={handleStartClick} 
            fullWidth 
            className="bg-brand hover:bg-brand-dark"
          >
            <Play size={20} fill="currentColor" />
            Iniciar Quiz
          </Button>
        </div>
      </div>

      {/* Info / Scores Column */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-xs uppercase tracking-wider text-muted mb-4 font-bold flex items-center gap-2">
            <Trophy size={16} className="text-brand" />
            Melhores Pontuações
          </h3>
          <div className="space-y-3">
            {renderBestScoreRow('roxo')}
            {renderBestScoreRow('laranja')}
            {renderBestScoreRow('misto')}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-brand-subtle border border-brand/10 text-sm space-y-4">
          <h3 className="font-bold text-brand-dark flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
            Dicas Rápidas
          </h3>
          <div className="flex gap-4">
             <div className="w-1 bg-roxo rounded-full shrink-0 h-auto" />
             <p className="text-gray-600 leading-relaxed">
               <strong className="text-roxo block mb-1">Fevereiro Roxo</strong>
               Informação, acolhimento e continuidade do tratamento de doenças crônicas como Lúpus e Alzheimer.
             </p>
          </div>
          <div className="flex gap-4">
             <div className="w-1 bg-laranja rounded-full shrink-0 h-auto" />
             <p className="text-gray-600 leading-relaxed">
               <strong className="text-laranja block mb-1">Fevereiro Laranja</strong>
               Atenção a sinais persistentes e incentivo responsável à doação de medula óssea para tratar Leucemia.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};