import { useState } from "react";
import { Button } from "../button";
import { useToast } from "../use-toast";

interface ShareButtonProps {
  attempts: number;
  correctGuess: boolean;
}

export function ShareButton({ attempts, correctGuess }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const generateShareText = () => {
    const gameUrl = "https://connectfive.games"; // Replace with actual URL when available
    const result = correctGuess
      ? `I guessed in ${attempts} attempts!`
      : "I couldn't guess today's team.";
    return `Connect 5 ${new Date().toISOString().split("T")[0]}\n${result}\n\nPlay now: ${gameUrl}`;
  };

  const handleCopy = async () => {
    const shareText = generateShareText();
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "You can now paste and share your result!",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleCopy} className="mt-4">
      {isCopied ? "Copied!" : "Share Result"}
    </Button>
  );
}
