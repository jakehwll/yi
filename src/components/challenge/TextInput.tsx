import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { type ChallengeProps, EditorState, type Question } from "~/utils/types";

interface InputProps extends ChallengeProps {
  question: Question;
  editorState: EditorState;
}

export const TextInput = ({
  question,
  editorState,
  onCorrect,
  onIncorrect,
  onNext,
}: InputProps) => {
  const [answer, setAnswer] = useState<string>("");
  const [wrongType, setWrongType] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [play] = useSound(question.data.audio ?? "", {
    interrupt: true,
  });

  useEffect(() => {
    if (editorState !== EditorState.Question) return;
    inputRef.current?.focus();
    setAnswer("");
  }, [editorState, inputRef]);

  const alternateKey = 
    question.answer_type === 'meaning'
      ? 'reading'
      : 'meaning'
  
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          if (answer === "" && editorState === EditorState.Question) return;
          if (editorState === EditorState.Question) {
            if (question === undefined) return;

            const correctAnswer = question.data[question.answer_type]
            
            const alternate = question.data[alternateKey]
            
            if (
              Array.isArray(correctAnswer)
                ? correctAnswer.includes(answer)
                : answer === question.data[question.answer_type]
            ) {
              play();
              onCorrect();
              setWrongType(false)
            } else {
              if ( 
                Array.isArray(alternate)
                  ? alternate.includes(answer)
                  : answer === alternate
              ) {
                setWrongType(true)
              } else {
                play();
                onIncorrect();
                setWrongType(false)
              }

              setAnswer("");
            }
          } else {
            setAnswer("");
            onNext();
          }
          break;
      }
    };
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  });

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-center py-1 px-2 font-medium text-sm uppercase bg-gray-300 rounded text-gray-900">
          {question.answer_type}
        </div>
        <h1 className="text-8xl font-medium">
          <ruby>
            {question.data[question.question_type]}
            <rt className="text-lg text-gray-800">
              {editorState !== EditorState.Question ? (
                <>{Array.isArray(question.data.pinyin) ? question.data.pinyin.join(', ') : question.data.pinyin}</>
              ) : (
                <>&nbsp;</>
              )}
            </rt>
          </ruby>
        </h1>
      </div>
      <div className="relative">
        {wrongType && (
          <div className="absolute top-[100%] left-[50%] -translate-x-1/2 py-1 px-4 w-full text-center bg-black/10 rounded my-2 font-medium text-sm">
            Oops, we want the {question.answer_type}, not the {alternateKey}.
          </div>
        )}
        <input
          type="text"
          autoFocus
          className={
            "w-fullshadow-sm rounded-lg border border-gray-200 px-4 py-4 text-center text-2xl transition-all duration-500 placeholder:text-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
          }
          placeholder={question.answer_type === 'meaning' ? "Input" : "输入"}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          disabled={editorState !== EditorState.Question}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
