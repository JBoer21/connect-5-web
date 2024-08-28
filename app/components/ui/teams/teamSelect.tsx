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
import { teams, Team } from "~/data/teams";

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
          {teams.map((team: Team, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                width={20}
                height={20}
              />
              <SelectItem
                value={team.name}
                className={`
                  flex-grow
                  ${
                    incorrectGuesses.includes(team.name)
                      ? "text-red-500 font-bold hover:text-red-600 hover:font-extrabold"
                      : ""
                  }
                `}
              >
                {team.name}
              </SelectItem>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
