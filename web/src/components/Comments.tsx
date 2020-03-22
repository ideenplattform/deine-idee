import React, { ReactElement } from "react";

export function Comments(props): JSX.Element {
  const comments = props.content.map(({name, text, comments})=> (
    <div className="border-l-4 border-gray-300 pl-4 pt-1 mt-4">
      <div className="pb-2 font-medium">{name}</div>
      <div>{text}</div>
      <Comments content={comments} />
    </div>
  ));

  return <div>{comments}</div>;
}
