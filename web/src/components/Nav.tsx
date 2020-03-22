import React from "react";

export function Nav(): JSX.Element {
  return (
    <nav className="flex flex-shrink-0 sticky h-48px px-5 bg-white">
      <div className="flex flex-col justify-center">
        <span className="text-lg">IdeaSpot</span>
      </div>
    </nav>
  );
}
