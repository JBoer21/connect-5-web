import React from "react";
import { Waypoints } from "lucide-react";
import { InstructionsDialog } from "./instructions";
import { Link } from "@remix-run/react";

export const Header: React.FC = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <Waypoints />
        </Link>
        <h1 className="text-xl font-semibold">Connect 5</h1>
      </div>
      <InstructionsDialog />
    </nav>
  );
};
