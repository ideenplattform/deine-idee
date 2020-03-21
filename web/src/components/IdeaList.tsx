import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const IDEAS = gql`
  {
    ideas {
      title
    }
  }
`;

export function IdeaList(): JSX.Element {
  const { loading, error, data } = useQuery(IDEAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.ideas.map(({ title }) => (
    <div>
      <p>{title}</p>
    </div>
  ));
}
