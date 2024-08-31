import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getHighResLogo } from "~/lib/utils/dialog_utils";
import { ShareButton } from "./shareButton";
import { StatCard } from "./stats";

interface CorrectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: number;
  teamName: string;
  teamLogo: string;
  daysInARow: number;
  correctStreak: number;
}

export const CorrectDialog: React.FC<CorrectDialogProps> = ({
  isOpen,
  onClose,
  attempts,
  teamName,
  teamLogo,
  daysInARow,
  correctStreak,
}) => {
  const [timeUntilNextGame, setTimeUntilNextGame] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );
      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeUntilNextGame(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogDescription>
            You guessed the correct team in {attempts}{" "}
            {attempts === 1 ? "try" : "tries"}!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center mt-4">
          <img
            src={getHighResLogo(teamLogo)}
            alt={`${teamName} logo`}
            width={100}
            height={100}
          />
          <p className="mt-2 text-lg font-semibold">{teamName}</p>
          <ShareButton attempts={attempts} correctGuess={true} />
          <div className="grid w-full grid-cols-2 gap-4 mt-4">
            <StatCard
              title={`Days in a Row Streak${daysInARow >= 7 ? " 🔥" : ""}`}
              value={daysInARow.toString()}
              textColor={daysInARow >= 7 ? "green" : undefined}
            />
            <StatCard
              title={`Correct Streak${correctStreak >= 3 ? " 🔥" : ""}`}
              value={correctStreak.toString()}
              textColor={correctStreak >= 3 ? "green" : undefined}
            />
          </div>
          <Card className="w-full mt-4">
            <CardHeader>
              <CardTitle>Next Game</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  {timeUntilNextGame}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
