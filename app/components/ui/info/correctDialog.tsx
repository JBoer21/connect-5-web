import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";

interface CorrectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: number;
  teamName: string;
  teamLogo: string;
}

export const CorrectDialog: React.FC<CorrectDialogProps> = ({
  isOpen,
  onClose,
  attempts,
  teamName,
  teamLogo,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogDescription>
            You guessed the correct team in {attempts}{" "}
            {attempts === 1 ? "try" : "tries"}!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center mt-4">
          <img
            src={teamLogo}
            alt={`${teamName} logo`}
            width={100}
            height={100}
          />
          <p className="mt-2 text-lg font-semibold">{teamName}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
