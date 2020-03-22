import React from "react";
import icon from "../icons/idea.svg";

export function Nav(): JSX.Element {
  return (
    <nav className="flex flex-shrink-0 sticky h-48px px-5 bg-white">
      <div className="flex justify-center">
        <span className="m-auto pb-1 mr-2">
          <img className="h-6" src={icon} />
        </span>
        <span className="text-lg m-auto">DeineIdee</span>
      </div>
    </nav>
  );
}
