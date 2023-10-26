export enum QuestionKeysType {
  Chinese,
  Roman,
  Pinyin,
  Audio,
}

export type Vocabulary = Record<string, string>;

export type Question = {
  id: string,
  //
  challenge_type: string;
  //
  question_type: string;
  answer_type: string;
  //
  data: Vocabulary;
};

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
