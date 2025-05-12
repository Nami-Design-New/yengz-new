import { useState, useEffect } from "react";

function useTruncateString(inputString, chars = 100) {
  const [truncatedString, setTruncatedString] = useState("");

  useEffect(() => {
    if (inputString?.length > 150) {
      setTruncatedString(inputString.substring(0, chars) + "...");
    } else {
      setTruncatedString(inputString);
    }
  }, [inputString, chars]);

  return truncatedString;
}

export default useTruncateString;
