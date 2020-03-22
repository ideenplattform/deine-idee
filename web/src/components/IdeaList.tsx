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
  // const { loading, error, data } = useQuery(IDEAS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  const data = {
    ideas: [
      {
        title: "Auslastungsmanagement",
        issue: "Unvermeindliche Menschenansammlungen in Supermärkten.",
        challenge:
          "Wie kann man Supermärkte und andere öffentliche Orte bestmöglichst auslasten, sodass so wenig Menschen wie möglich sich begegnen (Stoßzeiten vermeiden).",
        labels: [
          {
            title: "Kommunikation & Informationsvermittlung",
            color: "blue-300",
          },
        ],
      },
      {
        title: "Unterstützung von Personen die kein Internetzugriff haben",
        issue:
          "Es gibt bereits zahlreiche Webseiten, Chatgruppen(Whatsapp/Telegram) und App's, welche die Kommunikation zwischen Hilfesuchenden und Leuten die Hilfe anbieten erleichtert.Z.B.:- Webseite: http://www.quarantaenehelden.org/- Telegram Gruppe: https://t.me/CoronaSoliDarmstadt- Weite Gruppen: https://pad.systemli.org/p/9M9GOR5J4Zjnd74dXInr-keepWas ist aber mit Leuten die keinen Zugriff auf solche Medien hat z.B. die ältere Generation?Ein Vorschlag wäre eine Art Hotline einzurichten die autonom arbeitet.",
        challenge:
          "Wie können wir Personen ohne Internetzugriff Informationen bereitstellen und Unterstützung anbieten?",
        approach:
          "Die Lösungen sind bisher rein Internet gebunden.Es gibt bereits zahlreiche Webseiten, Chatgruppen(Whatsapp/Telegram) und App's, welche die Kommunikation zwischen Hilfesuchenden und Leuten die Hilfe anbieten erleichtert.Z.B.:- Webseite: http://www.quarantaenehelden.org/- Telegram Gruppe: https://t.me/CoronaSoliDarmstadt- Weite Gruppen: https://pad.systemli.org/p/9M9GOR5J4Zjnd74dXInr-keep",
        labels: [
          {
            title: "Kommunikation & Informationsvermittlung",
            color: "blue-300",
          },
          { title: "Solidarität und Zusammenhalt", color: "orange-300" },
        ],
      },
    ],
  };

  const ideas = data.ideas.map(
    ({ title, issue, challenge, approach, labels }) => (
      <div>
        <div className="bg-white rounded p-4 border border-gray-400 mb-4">
          <div className="mb-2">
            <div className="font-bold text-lg mb-2">{title}</div>
            <div className="font-light uppercase text-gray-700 text-xs tracking-wider mb-1">
              Problem
            </div>
            <div className="mb-3">{issue}</div>
            <div className="font-light uppercase text-gray-700 text-xs tracking-wider mb-1">
              Herausforderung
            </div>
            <div className="mb-3">{challenge}</div>
            {approach && (
              <div className="font-light uppercase text-gray-700 text-xs tracking-widest mb-1">
                Lösungansatz
              </div>
            )}
            <div className="mb-3">{approach}</div>
          </div>
          <div>
            {labels!.map(label => (
              <span className={`bg-${label.color} rounded-full px-3 py-1 m-1`}>
                {label.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  );

  const categories = [
    "Supermarkt Status",
    "Krankenhäuser",
    "Social Distancing",
    "Lebensmittel-Matching",
    "Analoge Unterstützung",
    "Mental Health",
    "Hilfsmittelverteilung",
    "Kreativer Gesundheitsschutze",
  ];

  const sidebar = (
    <div className="flex flex-col rounded bg-white rounded border border-gray-400 p-1">
      <div className="font-bold text-lg p-2">Kategorien</div>
      {categories.map(category => (
        <div className="px-2 py-1">{category}</div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex justify-center">
      <div className="w-640px">{ideas}</div>
      <div className="w-312px ml-4">{sidebar}</div>
    </div>
  );
}
