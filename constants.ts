import { QuestionData } from './types';

// Perguntas (15) — 5 fáceis, 8 médias, 2 difíceis
// categories: "roxo" (Lúpus/Fibromialgia/Alzheimer) | "laranja" (Leucemia)

export const QUESTION_BANK: QuestionData[] = [
  // =========================
  // FÁCEIS (5)
  // =========================
  {
    id: "F1",
    category: "roxo",
    question: "O Lúpus é, em geral, uma doença:",
    options: [
      "Autoimune (o corpo reage contra si mesmo)",
      "Sempre causada por bactéria contagiosa",
      "Que só afeta a pele",
      "Que só ocorre em idosos"
    ],
    answerIndex: 0,
    explanation: "Lúpus é uma doença autoimune e pode atingir diferentes órgãos e tecidos."
  },
  {
    id: "F2",
    category: "roxo",
    question: "Na fibromialgia, um sintoma muito comum é:",
    options: [
      "Dor crônica difusa pelo corpo",
      "Febre alta contínua",
      "Coceira contagiosa na pele",
      "Perda total de audição repentina"
    ],
    answerIndex: 0,
    explanation: "Fibromialgia costuma envolver dor crônica generalizada, além de fadiga e alterações do sono."
  },
  {
    id: "F3",
    category: "roxo",
    question: "Um sinal que pode estar relacionado ao Alzheimer é:",
    options: [
      "Esquecimentos frequentes que atrapalham a rotina",
      "Aumento rápido de força muscular",
      "Melhora da memória sem explicação",
      "Dor no dedo após uma pancada"
    ],
    answerIndex: 0,
    explanation: "No Alzheimer, alterações de memória e outras funções cognitivas podem interferir nas atividades do dia a dia."
  },
  {
    id: "F4",
    category: "laranja",
    question: "O Fevereiro Laranja chama atenção principalmente para:",
    options: [
      "Leucemia",
      "Hipertensão",
      "Câncer de pele",
      "Depressão"
    ],
    answerIndex: 0,
    explanation: "Fevereiro Laranja é conhecido pela conscientização sobre leucemia e incentivo à doação de medula óssea."
  },
  {
    id: "F5",
    category: "laranja",
    question: "A leucemia afeta principalmente:",
    options: [
      "Sangue e medula óssea",
      "Fígado e vesícula",
      "Pulmão e pleura",
      "Rins e bexiga"
    ],
    answerIndex: 0,
    explanation: "Leucemias envolvem alterações nas células do sangue, frequentemente com origem na medula óssea."
  },

  // =========================
  // MÉDIAS (8)
  // =========================
  {
    id: "M1",
    category: "roxo",
    question: "Uma conduta importante para quem tem suspeita de Lúpus é:",
    options: [
      "Procurar avaliação médica e acompanhamento regular",
      "Tomar antibiótico por conta própria",
      "Evitar qualquer consulta para não se preocupar",
      "Interromper remédios ao melhorar por 1 dia"
    ],
    answerIndex: 0,
    explanation: "O diagnóstico e o controle do lúpus exigem avaliação e seguimento, pois os sintomas podem variar."
  },
  {
    id: "M2",
    category: "roxo",
    question: "Na fibromialgia, qual abordagem tende a ajudar mais?",
    options: [
      "Tratamento multidisciplinar (ex.: atividade física orientada, sono, suporte)",
      "Apenas repouso absoluto por meses",
      "Somente antibiótico",
      "Ignorar sintomas para “passar sozinho”"
    ],
    answerIndex: 0,
    explanation: "A fibromialgia costuma responder melhor a um conjunto de medidas, incluindo hábitos e acompanhamento."
  },
  {
    id: "M3",
    category: "roxo",
    question: "Sobre Alzheimer, é correto dizer que:",
    options: [
      "É uma condição neurodegenerativa que pode evoluir com o tempo",
      "É sempre reversível em poucos dias",
      "Acontece apenas por falta de vontade",
      "Não impacta a vida diária"
    ],
    answerIndex: 0,
    explanation: "Alzheimer é uma condição neurodegenerativa; intervenções e apoio podem ajudar na qualidade de vida."
  },
  {
    id: "M4",
    category: "laranja",
    question: "Um conjunto de sinais que pode ocorrer na leucemia e merece avaliação se persistir é:",
    options: [
      "Cansaço, palidez, infecções frequentes e hematomas fáceis",
      "Espirros ao acordar e coceira leve por 1 dia",
      "Dor muscular após treino e melhora rápida",
      "Sede após comer salgado e melhora ao beber água"
    ],
    answerIndex: 0,
    explanation: "Alterações hematológicas podem levar a fadiga, palidez, infecções e sangramentos/hematomas com mais facilidade."
  },
  {
    id: "M5",
    category: "roxo",
    question: "No Lúpus, qual afirmação faz mais sentido?",
    options: [
      "Pode haver períodos de melhora e piora (fases)",
      "Os sintomas são sempre iguais para todo mundo",
      "Só existe um tipo de Lúpus, com a mesma gravidade",
      "Nunca precisa de acompanhamento"
    ],
    answerIndex: 0,
    explanation: "Lúpus pode variar ao longo do tempo e entre pessoas, com fases de atividade e controle."
  },
  {
    id: "M6",
    category: "roxo",
    question: "Em campanhas de conscientização, o mais responsável é:",
    options: [
      "Divulgar informação confiável e incentivar buscar ajuda profissional quando necessário",
      "Prometer “cura” rápida sem base científica",
      "Desencorajar exames para evitar preocupação",
      "Substituir tratamento por “receitas milagrosas”"
    ],
    answerIndex: 0,
    explanation: "Conscientização envolve informação de qualidade, acolhimento e orientação para avaliação adequada."
  },
  {
    id: "M7",
    category: "laranja",
    question: "Sobre doação de medula óssea, em geral:",
    options: [
      "É necessário cadastro e compatibilidade; pode salvar vidas",
      "Qualquer pessoa doa sem critérios e sem consentimento",
      "Não tem relação com doenças do sangue",
      "É proibida em todos os casos"
    ],
    answerIndex: 0,
    explanation: "A doação depende de cadastro e compatibilidade. Quando possível, pode ser decisiva para tratamento."
  },
  {
    id: "M8",
    category: "roxo",
    question: "Qual situação sugere buscar avaliação por possível alteração cognitiva?",
    options: [
      "Mudanças de memória e orientação que atrapalham tarefas do dia a dia",
      "Esquecer onde colocou a chave uma vez no mês",
      "Esquecer um nome e lembrar depois",
      "Sono ruim após uma noite de festa"
    ],
    answerIndex: 0,
    explanation: "Quando mudanças são persistentes e interferem na rotina, vale procurar avaliação profissional."
  },

  // =========================
  // DIFÍCEIS (2)
  // =========================
  {
    id: "D1",
    category: "roxo",
    question: "Qual afirmação diferencia melhor Fibromialgia de processos inflamatórios clássicos?",
    options: [
      "Pode haver dor intensa mesmo sem sinais claros de inflamação em exames, e o manejo costuma ser multidimensional",
      "Sempre há febre alta diária e cultura positiva",
      "É sempre causada por vírus específico e tem cura rápida",
      "Só melhora com antibiótico de amplo espectro"
    ],
    answerIndex: 0,
    explanation: "Fibromialgia pode ocorrer sem marcadores inflamatórios clássicos; o cuidado envolve sono, atividade física, suporte e acompanhamento."
  },
  {
    id: "D2",
    category: "laranja",
    question: "Na leucemia, a redução de plaquetas pode estar associada a:",
    options: [
      "Maior facilidade para sangramentos e hematomas",
      "Aumento de pelos e unhas mais fortes",
      "Melhora imediata da imunidade",
      "Aumento da visão noturna"
    ],
    answerIndex: 0,
    explanation: "Plaquetas ajudam na coagulação; quando estão baixas, pode haver sangramentos e hematomas com mais facilidade."
  }
];

export const STORAGE_KEY = "fev_quiz_best_v1";