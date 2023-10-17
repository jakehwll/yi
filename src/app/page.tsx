'use client';

import { Check, Inbox, ThumbsUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { TextInput } from "~/components/challenge/TextInput";
import { type Question, EditorState, type History } from "~/utils/types";

const LANGUAGE: 'en' | 'zh' = 'en'

const QUESTIONS: Question[] = [
  { chinese: '一', roman: 'yi', pinyin: 'yī' },
  { chinese: '二', roman: ['er', 'liang'], pinyin: ['èr', 'liǎng'] },
  { chinese: '三', roman: 'san', pinyin: 'sān' },
  { chinese: '四', roman: 'si', pinyin: 'sì' },
  { chinese: '五', roman: 'wu', pinyin: 'wǔ' },
  { chinese: '六', roman: 'liu', pinyin: 'liù' },
  { chinese: '七', roman: 'qi', pinyin: 'qī' },
  { chinese: '八', roman: 'ba', pinyin: 'bā' },
  { chinese: '九', roman: 'jiu', pinyin: 'jiǔ' },
  { chinese: '十', roman: 'shi', pinyin: 'shí' }
]

export default function HomePage() {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.Question)
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question | undefined>()

  const [history, setHistory] = useState<History[]>([])
  const [total, correct] = [
    history.length,
    history.filter((item) => item.correct === true).length,
    history.filter((item) => item.correct === false).length,
  ]

  const [playCorrect] = useSound('/assets/correct.wav')
  const [playIncorrect] = useSound('/assets/incorrect.wav')
  const [playFanfare] = useSound('/assets/fanfare.wav')

  const getRandomQuestion = () => {
    if ( questionList.length > 0 )
      return questionList[Math.floor(Math.random() * questionList.length) || 0]
    else {
      return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length) || 0]
    }
  }

  useEffect(() => {
    setQuestionList(QUESTIONS)
    setQuestion(getRandomQuestion())
  }, [])

  const onCorrect = () => {
    if ( !question ) return
    setHistory((history) => [
      ...history, 
      {
        question: question,
        correct: true
      }
    ])
    setQuestionList(
      (questionList) =>
      questionList.filter((item) => item.chinese !== question.chinese)
    )
    setEditorState(EditorState.AnswerCorrect)
    playCorrect()
  }

  const onIncorrect = () => {
    if ( !question ) return
    setHistory((history) => [
      ...history, 
      {
        question: question,
        correct: false
      }
    ])
    setEditorState(EditorState.AnswerIncorrect)
    playIncorrect()
  }

  const onNext = () => {
    if ( questionList.length > 0 ) {
      setQuestion(getRandomQuestion())
      setEditorState(EditorState.Question)
    } else {
      setEditorState(EditorState.Completed)
    playFanfare()
    }
  }

  const challengeProps = {
    onCorrect,
    onIncorrect,
    onNext
  }

  if ( editorState === EditorState.Completed ) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[100dvh] gap-8 bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-medium">Review Complete!</h1>
          <p>You completed this deck.</p>
          <div className="border-2 border-gray-300 py-3 px-8 rounded-xl font-medium w-80 text-center text-lg">
            <p>You got {new Number((100 / total) * correct).toFixed(0)}% right.</p>
          </div>
        </div>
        <button 
          type="button" 
          className="transition-all shadow-sm font-medium border-2 border-green-600 bg-green-500 text-white py-3 px-6 rounded-xl hover:-translate-y-1"
          onClick={() => {
            setHistory([])
            setQuestionList(QUESTIONS)
            setQuestion(getRandomQuestion())
            setEditorState(EditorState.Question)
          }}
        >
          Review Again
        </button>
      </main>
    )
  }

  return (
    <main className={"flex flex-col min-h-[100dvh] bg-gray-100"}>
      <header className="py-6 px-8 text-gray-800 flex flex-col gap-8">
        <div className="container mx-auto flex gap-8 items-center">
          <div className={"h-2 rounded-full flex flex-1 items-center bg-gray-200"}>
            <div 
              className={"h-2 transition-all duration-500 bg-blue-500 rounded-full"}
              style={{
                width: `${(100 / QUESTIONS.length) * (QUESTIONS.length - questionList.length)}%`
              }}
            />
          </div>
          <div className="flex gap-6 font-medium">
            <div className={"flex items-center gap-2"}>
              <ThumbsUp size={16} />
              <span>{total > 0 ? new Number((100 / total) * correct).toFixed(0) : 100}%</span>
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
      <section className="flex flex-col flex-1">
        <div className="container mx-auto py-12 px-4 flex items-center justify-center">
          {question && (
            <TextInput
              question={question}
              editorState={editorState}
              language={LANGUAGE}
              {...challengeProps}
            />
          )}
        </div>
      </section>
      {(editorState === EditorState.AnswerCorrect || editorState === EditorState.AnswerIncorrect) && (
        <footer className={'py-8 px-8 rounded-t-2xl overflow-hidden bg-white transition-all duration-500 animate-slidein border-2 border-b-0 -mx-[2px]'}>
          <div className="container mx-auto">
            <div className="w-full flex items-center justify-between">
              <div className="text-2xl font-medium flex gap-2 items-center">
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
                className="transition-all shadow-sm font-medium border-2 border-blue-600 bg-blue-500 text-white py-3 px-6 rounded-xl hover:-translate-y-1"
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
