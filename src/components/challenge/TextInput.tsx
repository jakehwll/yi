import { useEffect, useRef, useState } from "react";
import { type ChallengeProps, EditorState, type Question } from "~/utils/types";

interface InputProps extends ChallengeProps {
  question: Question;
  editorState: EditorState;
  language: string;
}

export const TextInput = ({ question, editorState, language, onCorrect, onIncorrect, onNext }: InputProps) => {
  const [answer, setAnswer] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if ( editorState !== EditorState.Question )
      return
    inputRef.current?.focus()
    setAnswer('')
  }, [editorState, inputRef])
  
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'Enter':
          if ( answer === '' && editorState === EditorState.Question ) return
          if ( editorState === EditorState.Question) {
            if ( question === undefined ) return
            if ( Array.isArray(question.roman) ? question.roman.includes(answer) : answer === question.roman ) {
              onCorrect()
            } else {
              onIncorrect()
              setAnswer('')
            }
          } else {
            setAnswer('')
            onNext()
          }
          break;
      }
    }
    window.addEventListener('keydown', callback)
    return () => window.removeEventListener('keydown', callback)
  })

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-8xl font-medium">
          <ruby>
            {question.chinese}
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
          placeholder={language === 'zh' ? '拼音' : 'Pinyin'}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          disabled={editorState !== EditorState.Question}
          ref={inputRef}
        />
    </div>
  )
}