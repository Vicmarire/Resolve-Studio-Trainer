import type { RawQuestion, Question, Option } from '../types';

/**
 * Shuffles an array using Durstenfeld shuffle algorithm.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Detects if a question is a True/False question by analysing its text.
 */
function isTrueFalseQuestion(q: RawQuestion): boolean {
  const text = (q.pregunta_en + ' ' + q.pregunta_es).toLowerCase();
  return text.includes('true or false') || text.includes('verdadero o falso');
}

/**
 * Generates options for a question:
 *  - True/False questions → exactly 2 options (True / False).
 *  - Open questions → correct answer + 3 distractors taken only from
 *    other open (non-T/F) questions, so T/F text never leaks into open options.
 */
export function processQuestions(rawQuestions: RawQuestion[]): Question[] {
  // Pool of answers from open questions only – used as fallback distractors
  const openQuestions = rawQuestions.filter(q => !isTrueFalseQuestion(q));

  return rawQuestions.map((q, index) => {
    let options: Option[];

    if (isTrueFalseQuestion(q)) {
      const correctIsTrue =
        q.respuesta_en.trim().toLowerCase().startsWith('true') ||
        q.respuesta_es.trim().toLowerCase().startsWith('verdadero');

      // ALWAYS exactly 2 options for T/F questions as requested
      options = [
        {
          id: 'true',
          text_en: 'True.',
          text_es: 'Verdadero.',
          isCorrect: correctIsTrue,
        },
        {
          id: 'false',
          text_en: 'False.',
          text_es: 'Falso.',
          isCorrect: !correctIsTrue,
        },
      ];
    } else {
      // 1. Get specific distractors if they exist
      let distractors: { en: string; es: string }[] = [];
      
      if (q.distractores_en && q.distractores_es && q.distractores_en.length > 0) {
        distractors = q.distractores_en.map((en, i) => ({
          en,
          es: q.distractores_es![i] || en,
        }));
      }

      // 2. If we need more distractors, pick from other open questions
      if (distractors.length < 3) {
        const otherOpenAnswers = openQuestions
          .filter(oq => oq !== q)
          .map(oq => ({ en: oq.respuesta_en, es: oq.respuesta_es }))
          // Ensure we don't pick "True" or "False" as distractors for open questions
          .filter(a => !['true.', 'false.', 'verdadero.', 'falso.'].includes(a.es.toLowerCase().trim()));
        
        const needed = 3 - distractors.length;
        const fallback = shuffleArray(otherOpenAnswers).slice(0, needed);
        distractors = [...distractors, ...fallback];
      }

      // 3. Final shuffle of correct answer + distractors
      options = shuffleArray([
        {
          id: 'correct',
          text_en: q.respuesta_en,
          text_es: q.respuesta_es,
          isCorrect: true,
        },
        ...distractors.slice(0, 3).map((d, i) => ({
          id: `distractor-${i}`,
          text_en: d.en,
          text_es: d.es,
          isCorrect: false,
        })),
      ]);
    }

    return {
      ...q,
      id: `q-${index}-${q.pagina}`,
      options,
    };
  });
}
