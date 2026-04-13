import { useState, useEffect } from "react";

interface TypingAnimationProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export default function TypingAnimation({ words, speed = 100, deleteSpeed = 50, pauseDuration = 5000 }: TypingAnimationProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, pauseDuration]);

  return (
    <span className="font-mono text-lg text-primary md:text-xl">
      {text}
      <span className="animate-[pulse_1s_ease-in-out_infinite] text-primary">|</span>
    </span>
  );
}
