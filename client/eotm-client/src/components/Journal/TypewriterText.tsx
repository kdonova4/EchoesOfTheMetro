import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
};

function TypewriterText({ text, speed = 50 }: TypewriterProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0); // reset when text changes
  }, [text]);

  useEffect(() => {
    if (index >= text.length) return; // stop when done

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, text, speed]);

  return (
    <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>
      {text.substring(0, index)}
    </p>
  );
}

export default TypewriterText;
