'use client';

import { Check, Inbox, ThumbsUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSound from 'use-sound';

interface Question {
  question: string
  answer: string
  pinyin: string
}

enum EditorState {
  Question,
  AnswerCorrect,
  AnswerIncorrect,
  Completed
}

const LANGUAGE: 'en' | 'zh' = 'en'

const QUESTIONS: Question[] = [
  { question: '一', answer: 'yi', pinyin: 'yī' },
  { question: '二', answer: 'er', pinyin: 'èr / liǎng' },
  { question: '三', answer: 'san', pinyin: 'sān' },
  { question: '四', answer: 'si', pinyin: 'sì' },
  { question: '五', answer: 'wu', pinyin: 'wǔ' },
  { question: '六', answer: 'liu', pinyin: 'liù' },
  { question: '七', answer: 'qi', pinyin: 'qī' },
  { question: '八', answer: 'ba', pinyin: 'bā' },
  { question: '九', answer: 'jiu', pinyin: 'jiǔ' },
  { question: '十', answer: 'shi', pinyin: 'shí' }
]

export default function HomePage() {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.Question)
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [question, setQuestion] = useState<Question | undefined>()
  const [answer, setAnswer] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  const [total, setTotal] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)

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

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if ( event.key === 'Enter' ) {
        if ( inputRef.current === null ) return
        if ( answer === '' && editorState === EditorState.Question ) return
        if ( editorState === EditorState.Question) {
          setTotal((total) => total + 1)
          if ( answer === question?.answer ) {
            setCorrect((correct) => correct + 1)
            setQuestionList(
              (questionList) =>
              questionList.filter((item) => item.answer !== question.answer)
            )
            setEditorState(EditorState.AnswerCorrect)
            playCorrect()
          } else {
            setIncorrect((incorrect) => incorrect + 1)
            setEditorState(EditorState.AnswerIncorrect)
            setAnswer('')
            playIncorrect()
          }
        } else {
          if ( questionList.length > 0 ) {
            setQuestion(getRandomQuestion())
            setEditorState(EditorState.Question)
            setAnswer('')
          } else {
            setEditorState(EditorState.Completed)
            playFanfare()
          }
        }
      } 
    }
    window.addEventListener('keydown', callback)
    return () => window.removeEventListener('keydown', callback)
  })

  useEffect(() => {
    if ( editorState !== EditorState.Question )
      return
    inputRef.current?.focus()
  }, [editorState])

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
            setTotal(0)
            setCorrect(0)
            setIncorrect(0)
            setQuestionList(QUESTIONS)
            setQuestion(getRandomQuestion())
            setEditorState(EditorState.Question)
            setAnswer('')
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
          {/* component */}
          {question && (
            <div className="flex flex-col gap-8 items-center justify-center">
              <h1 className="text-8xl font-medium">
                <ruby>
                  {question.question}
                  <rt className="text-lg text-gray-800">
                  {editorState === EditorState.AnswerIncorrect ? (
                    <>{question.pinyin}</>
                  ) : (
                    <>&nbsp;</>
                  )}
                  </rt>
                </ruby>
              </h1>
              <input 
                type="text" 
                autoFocus
                className={"py-4 px-4 border-2 rounded-lg text-2xl text-center w-fullshadow-sm transition-all duration-500 placeholder:text-gray-200 border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:ring-2"}
                placeholder={LANGUAGE === 'zh' ? '拼音' : 'Pinyin'}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                disabled={editorState !== EditorState.Question}
                ref={inputRef}
              />
            </div>
          )}
          {/* /component */}
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
              <button type="submit" className="transition-all shadow-sm font-medium border-2 border-blue-600 bg-blue-500 text-white py-3 px-6 rounded-xl hover:-translate-y-1">
                Next
              </button>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
