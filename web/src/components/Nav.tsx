import React from "react";
import icon from "../icons/idea.svg";
import { Link } from "react-router-dom";

export function Nav(): JSX.Element {
  return (
    <nav className="flex flex-shrink-0 sticky h-48px px-5 bg-white justify-between">
      <div className="flex justify-center">
        <span className="m-auto pb-1 mr-2">
          <img className="h-6" src={icon} />
        </span>
        <span className="text-lg m-auto"><Link to="/">DeineIdee</Link></span>
      </div>
      <div className="my-auto w-5/12">
        <div className="flex border border-gray-sm bg-surface-medium rounded py-px w-full">
          <input className="ml-2 w-full bg-surface-medium" placeholder="Suche" />
          <div className="my-auto mx-1 icon-search text-gray-400 hover:text-gray-600" />
        </div>
      </div>
    </nav>
  );
}
