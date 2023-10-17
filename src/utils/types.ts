export interface Question {
  chinese: string;
  roman: string | string[];
  pinyin: string | string[];
}

export interface History {
  question: Question;
  correct: boolean;
}

export enum EditorState {
  Question,
  AnswerCorrect,
  AnswerIncorrect,
  Completed,
}

export interface ChallengeProps {
  onCorrect: () => void;
  onIncorrect: () => void;
  onNext: () => void;
}