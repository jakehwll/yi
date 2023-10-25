import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { type ChallengeProps, EditorState, type Question } from "~/utils/types";

interface InputProps extends ChallengeProps {
  question: Question;
  editorState: EditorState;
  language: string;
}

export const TextInput = ({
  question,
  editorState,
  language,
  onCorrect,
  onIncorrect,
  onNext,
}: InputProps) => {
  const [answer, setAnswer] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [play] = useSound(question.data.audio ?? "", {
    interrupt: true,
  });

  useEffect(() => {
    if (editorState !== EditorState.Question) return;
    inputRef.current?.focus();
    setAnswer("");
  }, [editorState, inputRef]);

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          if (answer === "" && editorState === EditorState.Question) return;
          if (editorState === EditorState.Question) {
            if (question === undefined) return;
            play();
            if (
              Array.isArray(question.data[question.answer_type])
                ? (question.data[question.answer_type] ?? []).includes(answer)
                : answer === question.data[question.answer_type]
            ) {
              onCorrect();
            } else {
              onIncorrect();
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
      <h1 className="text-8xl font-medium">
        <ruby>
          {question.data.chinese}
          <rt className="text-lg text-gray-800">
            {editorState !== EditorState.Question ? (
              <>{Array.isArray(question.data.pinyin) ? question.data.pinyin.join(', ') : question.data.pinyin}</>
            ) : (
              <>&nbsp;</>
            )}
          </rt>
        </ruby>
      </h1>
      <input
        type="text"
        autoFocus
        className={
          "w-fullshadow-sm rounded-lg border border-gray-200 px-4 py-4 text-center text-2xl transition-all duration-500 placeholder:text-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
        }
        placeholder={language === "zh" ? "拼音" : "Pinyin"}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        disabled={editorState !== EditorState.Question}
        ref={inputRef}
      />
    </div>
  );
};
