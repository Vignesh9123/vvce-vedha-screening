import { useState, useEffect, useCallback } from "react";

export function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false);
  const [text, setText] = useState("");

  const speak = useCallback((newText: string) => {
    setText(newText);
  }, []);

  useEffect(() => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    speechSynthesis.speak(utterance);

    return () => {
      speechSynthesis.cancel();
    };
  }, [text]);

  return { speak, speaking };
}
