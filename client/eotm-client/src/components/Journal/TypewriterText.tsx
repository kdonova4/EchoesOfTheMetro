import { useEffect, useState } from "react";

type TypewriterProps = {
    text: string;
    speed: number;
}

function TypewriterText({ text, speed = 50 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("")
    let i = -1;
    
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <p style={{ whiteSpace: "pre-wrap" }}>{displayed}</p>;
}

export default TypewriterText;
