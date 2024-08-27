import React from "react";
import { Waypoints } from "lucide-react";
import { HoverHelp } from "./instructions";

export const Header: React.FC = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <div className="flex items-center space-x-2">
        <Waypoints />
        <h1 className="text-xl font-semibold">Connect 5</h1>
      </div>
      <HoverHelp />
    </nav>
  );
};
