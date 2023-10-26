"use client";

import { Check, Inbox, ThumbsUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AudioInput } from "~/components/challenge/AudioInput";
import { TextInput } from "~/components/challenge/TextInput";
import { api } from "~/utils/api";
import { type Question, EditorState, type History, type Vocabulary } from "~/utils/types";


const QUESTIONS: Question[] = [
  // {
  //   id: 'vocab_2',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['2'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'vocab_3',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['3'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'vocab_4',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['4'] ?? DEFAULT_VOCAB
  // },
  // {
  //   id: 'vocab_5',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['5'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'vocab_6',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['6'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'vocab_7',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['7'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'vocab_8',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['8'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'vocab_9',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['9'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'vocab_10',
  //   challenge_type: "text",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['10'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_1',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['1'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_2',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['2'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_3',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['3'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_4',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['4'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_5',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['5'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_6',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['6'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_7',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['7'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_8',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['8'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_9',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['9'] ?? DEFAULT_VOCAB,
  // },
  // {
  //   id: 'sound_10',
  //   challenge_type: "audio",
  //   question_type: "chinese",
  //   answer_type: "roman",
  //   data: VOCABULARY['10'] ?? DEFAULT_VOCAB,
  // },
];

export default function HomePage() {
  const router = useRouter()
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.Question,
  );
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question | undefined>();

  const [history, setHistory] = useState<History[]>([]);
  const [total, correct] = [
    history.length,
    history.filter((item) => item.correct === true).length,
    history.filter((item) => item.correct === false).length,
  ];

  const challengeMutation = api.deck.getChallenges.useMutation()

  const [playCorrect] = useSound("/assets/correct.wav");
  const [playIncorrect] = useSound("/assets/incorrect.wav");
  const [playFanfare] = useSound("/assets/fanfare.wav");

  const getRandomQuestion = (input?: Question[]) => {
    if ( input ) {
      return input[Math.floor(Math.random() * input.length) || 0];
    } else {
      return questionList[Math.floor(Math.random() * questionList.length) || 0];
    }
  };

  useEffect(() => {
    challengeMutation.mutateAsync({ id: "clo6dhqup0001zoc2zb24yue0" })
      .then((res) => {
        setQuestionList(
          res.challenges.map((v) => ({
            id: v.id,
            challenge_type: v.type,
            question_type: v.input,
            answer_type: v.output,
            data: v.definition.data as Vocabulary,
          }))
        )
        setQuestion(
          getRandomQuestion(
            res.challenges.map((v) => ({
              id: v.id,
              challenge_type: v.type,
              question_type: v.input,
              answer_type: v.output,
              data: v.definition.data as Vocabulary,
            })) as Question[]
          )
        )
      })
  }, [])

  const onCorrect = () => {
    if (!question) return;
    setHistory((history) => [
      ...history,
      {
        question: question,
        correct: true,
      },
    ]);
    setQuestionList((questionList) =>
      questionList.filter((item) => item.id !== question.id),
    );
    setEditorState(EditorState.AnswerCorrect);
    playCorrect();
  };

  const onIncorrect = () => {
    if (!question) return;
    setHistory((history) => [
      ...history,
      {
        question: question,
        correct: false,
      },
    ]);
    setEditorState(EditorState.AnswerIncorrect);
    playIncorrect();
  };

  const onNext = () => {
    if (questionList.length > 0) {
      setQuestion(getRandomQuestion());
      setEditorState(EditorState.Question);
    } else {
      setEditorState(EditorState.Completed);
      playFanfare();
    }
  };

  const challengeProps = {
    onCorrect,
    onIncorrect,
    onNext,
  };

  if (editorState === EditorState.Completed) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-medium">Review Complete!</h1>
          <p>You completed this deck.</p>
          <div className="w-80 rounded-xl bg-white border border-gray-200 shadow-sm px-8 py-4 text-center font-medium">
            <p>
              You got {new Number((100 / total) * correct).toFixed(0)}% right.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="rounded-xl text-sm border border-gray-200 bg-white px-6 py-3 font-medium text-black shadow-sm transition-all"
            onClick={() => router.push('/dashboard')}
          >
            Back to Decks
          </button>
          <button
            type="button"
            className="rounded-xl text-sm border border-emerald-600 bg-emerald-500 px-6 py-3 font-medium text-white shadow-sm transition-all"
            onClick={() => {
              setHistory([]);
              setQuestionList(QUESTIONS);
              setQuestion(getRandomQuestion());
              setEditorState(EditorState.Question);
            }}
          >
            Review Again
          </button>
        </div>
      </main>
    );
  }

  const ChallengeComponent = (() => {
    if ( !question ) return null
    switch (question.challenge_type) {
      case "text":
        return (
          <TextInput
            {...challengeProps}
            question={question}
            editorState={editorState}
            language="en"
          />
        );
      case "audio":
        return (
          <AudioInput
            {...challengeProps}
            question={question}
            editorState={editorState}
            language="en"
          />
        )
      default:
        return null;
    }
  })();

  return (
    <main className={"flex min-h-[100dvh] flex-col bg-gray-100"}>
      <header className="flex flex-col gap-8 px-8 py-6 text-gray-800">
        <div className="container mx-auto flex items-center gap-8">
          <button type="button" onClick={() => router.push('/dashboard')}>
            <X size={24} />
          </button>
          <div
            className={"flex h-2 flex-1 items-center rounded-full bg-gray-200"}
          >
            <div
              className={
                "h-2 rounded-full bg-emerald-500 transition-all duration-500"
              }
              style={{
                width: `${
                  (100 / QUESTIONS.length) *
                  (QUESTIONS.length - questionList.length)
                }%`,
              }}
            />
          </div>
          <div className="flex gap-6 font-medium">
            <div className={"flex items-center gap-2"}>
              <ThumbsUp size={16} />
              <span>
                {total > 0
                  ? new Number((100 / total) * correct).toFixed(0)
                  : 100}
                %
              </span>
            </div>
            <div className={"flex items-center gap-2"}>
              <Check size={16} />
              <span>{total}</span>
            </div>
            <div className={"flex items-center gap-2"}>
              <Inbox size={16} />
              <span>{questionList.length}</span>
            </div>
          </div>
        </div>
      </header>
      <section className="flex flex-1 flex-col">
        <div className="container mx-auto flex items-center justify-center px-4 py-12">
          {ChallengeComponent}
        </div>
      </section>
      {(editorState === EditorState.AnswerCorrect ||
        editorState === EditorState.AnswerIncorrect) && (
        <footer
          className={
            "-mx-[2px] animate-slidein overflow-hidden rounded-t-2xl border border-b-0 bg-white px-8 py-8 transition-all duration-500"
          }
        >
          <div className="container mx-auto">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2 text-2xl font-medium">
                {editorState === EditorState.AnswerCorrect ? (
                  <>
                    <Check />
                    Correct!
                  </>
                ) : (
                  <>
                    <X />
                    Incorrect!
                  </>
                )}
              </div>
              <button
                type="submit"
                onClick={() => onNext()}
                className="rounded-xl border border-emerald-600 bg-emerald-500 px-6 py-3 font-medium text-white shadow-sm transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
