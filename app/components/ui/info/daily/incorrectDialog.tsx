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
import { ShareButton } from "../shareButton";
import { StatCard } from "../stats";

interface IncorrectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: number;
  teamName: string;
  teamLogo: string;
  daysInARow: number;
  correctStreak: number;
}

export const IncorrectDialog: React.FC<IncorrectDialogProps> = ({
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
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

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
          <DialogTitle>
            <h2>Better luck next time!</h2>
          </DialogTitle>
          <DialogDescription>
            <p>
              You were unable to guess the correct team in {attempts}{" "}
              {attempts === 1 ? "try" : "tries"}.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center mt-4">
          <img
            src={getHighResLogo(teamLogo)}
            alt={`${teamName} logo`}
            width={100}
            height={100}
            loading="lazy"
          />
          <h3 className="mt-2 text-lg font-semibold">
            The correct team was: {teamName}
          </h3>
          <ShareButton attempts={attempts} correctGuess={false} />
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
              <CardTitle>
                <h4>Next Game</h4>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" aria-hidden="true" />
                <time className="text-lg font-semibold">
                  {timeUntilNextGame}
                </time>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
