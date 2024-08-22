// TeamSelect.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { teams } from "~/data/teams";

interface TeamSelectProps {
  onValueChange: (value: string) => void;
  incorrectGuesses: string[];
}

export const TeamSelect: React.FC<TeamSelectProps> = ({
  onValueChange,
  incorrectGuesses,
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a club" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {teams.map((team, index) => (
            <SelectItem
              value={team}
              key={index}
              className={incorrectGuesses.includes(team) ? "text-red-500" : ""}
            >
              {team}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
