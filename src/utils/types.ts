export enum ChallengeType {
  text,
  audio
}

export enum QuestionKeysType {
  chinese,
  roman,
  pinyin,
  audio,
}

export type Vocabulary = {
  [key in keyof typeof QuestionKeysType]: string | string[] | undefined;
}

export type Question = {
  id: string,
  //
  challenge_type: keyof typeof ChallengeType;
  //
  question_type: keyof typeof QuestionKeysType;
  answer_type: keyof typeof QuestionKeysType;
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
