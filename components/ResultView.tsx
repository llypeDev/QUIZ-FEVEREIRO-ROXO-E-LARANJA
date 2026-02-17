import React, { useRef, useState } from 'react';
import { GameState, Mode } from '../types';
import { Button } from './Button';
import { Home, Share2, RefreshCw, ChevronDown, Loader2, Gift } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Modal } from './Modal';

interface ResultViewProps {
  state: GameState;
  mode: Mode;
  userName: string;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  state,
  mode,
  userName,
  onRestart,
  onHome,
}) => {
  const total = state.questions.length;
  const pct = Math.round((state.score / total) * 100);
  const shareRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Check promo eligibility (Mixed mode, 15 questions, AND >= 80% score)
  const isPromoEligible = mode === 'misto' && total === 15 && pct >= 80;

  let message = "";
  if (pct >= 90) message = "Excelente! Você domina o assunto.";
  else if (pct >= 70) message = "Muito bom! Continue se informando.";
  else if (pct >= 50) message = "Bom começo! Vale a pena revisar.";
  else message = "O importante é aprender! Tente novamente.";

  const handleShareImage = async () => {
    if (!shareRef.current) return;
    setIsSharing(true);

    try {
      // Capture the element
      const canvas = await html2canvas(shareRef.current, {
        scale: 2, // Retinas resolution
        backgroundColor: '#ffffff', // Force white background
        logging: false,
        useCORS: true
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
            setIsSharing(false);
            return;
        }

        const fileName = `quiz-fevereiro-roxo-laranja-${new Date().getTime()}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // Try native sharing first (Mobile)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Meu Resultado no Quiz',
              text: `Consegui ${state.score}/${total} pontos no Quiz Fevereiro Roxo e Laranja! 💚 #fevereiroroxoelaranja`
            });
          } catch (error) {
            // User cancelled or error, harmless
            console.log("Sharing cancelled or failed", error);
          }
        } else {
          // Fallback to download (Desktop)
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          URL.revokeObjectURL(link.href);
          
          // Show modal instead of alert
          setShowShareModal(true);
        }
        setIsSharing(false);
      }, 'image/png');
      
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Ocorreu um erro ao gerar a imagem.");
      setIsSharing(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-10">
      
      {/* Capture Area */}
      <div ref={shareRef} className="text-center space-y-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        {/* Decorative background blobs for the capture */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-roxo/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-laranja/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Parabéns, <span className="text-brand">{userName}</span>!
            </h3>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700 mb-6 font-medium">
              {mode === 'misto' && <span className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-roxo"/><span className="w-2.5 h-2.5 rounded-full bg-laranja"/></span>}
              {mode === 'roxo' && <span className="w-2.5 h-2.5 rounded-full bg-roxo"/>}
              {mode === 'laranja' && <span className="w-2.5 h-2.5 rounded-full bg-laranja"/>}
              <span className="capitalize tracking-wide">{mode === 'roxo' ? 'Fevereiro Roxo' : mode === 'laranja' ? 'Fevereiro Laranja' : 'Misto'}</span>
            </div>

            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full"></div>
              <div className="relative flex items-baseline justify-center gap-2">
                  <span className="text-8xl font-black text-brand-dark drop-shadow-sm tracking-tighter">
                  {state.score}
                  </span>
                  <span className="text-3xl text-gray-400 font-bold">/{total}</span>
              </div>
            </div>
            
            <p className="text-lg font-medium text-gray-600 max-w-md mx-auto">{message}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400 uppercase tracking-widest font-semibold">
                <span>Campanha Fevereiro Roxo & Laranja</span>
            </div>
        </div>
      </div>
        
      {/* Promo Notification */}
      {isPromoEligible && (
         <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm animate-in slide-in-from-bottom-4">
           <div className="bg-orange-100 p-3 rounded-full text-orange-500 shrink-0">
             <Gift size={28} />
           </div>
           <div>
             <h4 className="font-bold text-orange-800 text-lg">Você está concorrendo!</h4>
             <p className="text-orange-700/80 text-sm">
               Você atingiu a meta de 80% de acertos. Para concorrer ao sorteio, compartilhe seu resultado nos comentários do <a href="https://queroquero.mybeehome.com/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">post da campanha no ComuniQ</a> com a hashtag <strong>#fevereiroroxoelaranja</strong>.
             </p>
           </div>
         </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button onClick={onRestart} className="min-w-[180px]">
        <RefreshCw size={20} /> Jogar Novamente
        </Button>
        <Button variant="outline" onClick={handleShareImage} disabled={isSharing}>
            {isSharing ? <Loader2 size={20} className="animate-spin" /> : <Share2 size={20} />}
            {isSharing ? 'Gerando...' : 'Compartilhar Resultado'}
        </Button>
        <Button variant="ghost" onClick={onHome}>
        <Home size={20} /> Início
        </Button>
      </div>

      <div className="p-6 rounded-2xl border border-blue-100 bg-blue-50/50 text-sm shadow-sm">
        <strong className="flex items-center gap-2 text-blue-900 mb-2 text-base">
          <span className="text-xl">💡</span> Aprendizado
        </strong>
        <p className="text-blue-800 leading-relaxed text-base">
           Informações de campanhas de saúde ajudam a identificar sinais de alerta e buscar cuidado. 
           Se houver sintomas persistentes, procure um serviço de saúde.
        </p>
      </div>

      <div>
        <h3 className="text-sm uppercase tracking-wider text-muted font-bold mb-5 pl-1">Revisão Detalhada</h3>
        <div className="space-y-4">
          {state.answers.map((ans, idx) => {
            const question = state.questions.find(q => q.id === ans.questionId);
            if (!question) return null;
            
            return (
              <details key={ans.questionId} className="group rounded-2xl border border-gray-200 bg-white overflow-hidden open:shadow-md transition-all duration-300">
                <summary className="flex items-start md:items-center justify-between p-4 md:p-5 cursor-pointer select-none hover:bg-gray-50 transition-colors gap-3">
                  <div className="flex items-start md:items-center gap-3 md:gap-4 flex-1">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold shadow-sm shrink-0 mt-0.5 md:mt-0 ${ans.isCorrect ? 'bg-brand text-white' : 'bg-red-500 text-white'}`}>
                      {ans.isCorrect ? '✓' : '✕'}
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base leading-snug">{question.question}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted transition-transform group-open:rotate-180 shrink-0 mt-1 md:mt-0 ml-2" />
                </summary>
                <div className="p-5 pt-0 text-sm text-gray-600 border-t border-gray-100 mt-2">
                  <div className="grid gap-3 mt-4">
                    <div className={`p-3 rounded-lg border ${ans.isCorrect ? 'border-brand/20 bg-brand-subtle' : 'border-red-200 bg-red-50'}`}>
                      <span className="text-xs uppercase font-bold opacity-70 block mb-1">Sua resposta</span>
                      <span className={`font-medium ${ans.isCorrect ? 'text-brand-dark' : 'text-red-700'}`}>
                         {question.options[ans.selectedIndex]}
                      </span>
                    </div>
                    {!ans.isCorrect && (
                      <div className="p-3 rounded-lg border border-brand/20 bg-brand-subtle">
                        <span className="text-xs uppercase font-bold opacity-70 block mb-1">Resposta correta</span>
                        <span className="font-medium text-brand-dark">
                          {question.options[question.correctIndex]}
                        </span>
                      </div>
                    )}
                    <div className="mt-2 text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg italic border-l-4 border-gray-300">
                      {question.explanation}
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={showShareModal}
        title="Imagem Salva!"
        description="A imagem com seu resultado foi baixada para seu dispositivo. Compartilhe-a no ComuniQ com a hashtag #fevereiroroxoelaranja para participar do sorteio!"
        confirmText="Entendido"
        singleButton
        type="success"
        onCancel={() => setShowShareModal(false)}
      />
    </div>
  );
};