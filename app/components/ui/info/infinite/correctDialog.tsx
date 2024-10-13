import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { getHighResLogo } from "~/lib/utils/dialog_utils";
import { Button } from "~/components/ui/button";

interface CorrectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: number;
  teamName: string;
  teamLogo: string;
  onPlayAgain: () => void;
}

export const CorrectDialog: React.FC<CorrectDialogProps> = ({
  isOpen,
  onClose,
  attempts,
  teamName,
  teamLogo,
  onPlayAgain,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <h2>Congratulations!</h2>
          </DialogTitle>
          <DialogDescription>
            <p>
              You guessed the correct team in {attempts}{" "}
              {attempts === 1 ? "try" : "tries"}!
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
          <h3 className="mt-2 text-lg font-semibold">{teamName}</h3>
          <div className="mt-6">
            {" "}
            {/* Increased vertical spacing */}
            <Button
              onClick={() => onPlayAgain()}
              className="flex items-center justify-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <span className="material-icons">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
