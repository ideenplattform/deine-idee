import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import wirvsvirus from "../images/wirvsvirus3.png";
import wirvsvirusLogo from "../images/wirvsvirus-logo.png";

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
              <span
                className={`bg-${label.color} text-sm rounded-full px-3 py-1 m-1`}
              >
                {label.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  );

  const sidebar = (
    <div className="flex flex-col rounded bg-white rounded border border-gray-400 p-3">
      <div className="font-bold text-lg">Zusammenfassung</div>
      <div>Ideen 800</div>
      <div>Teilnehmer 40t</div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-center h-200px">
        <img className="h-200px" src={wirvsvirus} />
      </div>
      <div className="flex justify-center bg-white">
        <div className="flex flex-col w-976px bg-white">
          <div className="flex mb-3">
            <img className="h-20 rounded-full -mt-4" src={wirvsvirusLogo} />
            <div>
              <div className="font-bold text-2xl p-2">WirVsVirus</div>
            </div>
          </div>
          <div className="flex">
            <div className="font-bold text-gray-800 px-4 pt-2 pb-1 border-b-4 border-red-500">
              Ideen
            </div>
            <div className="font-bold text-gray-700 px-4 pt-2 pb-1">
              Projekte
            </div>
            <div className="font-bold text-gray-700 px-4 pt-2 pb-1">Wiki</div>
            <div className="font-bold text-gray-700 px-4 pt-2 pb-1">
              Einführung
            </div>
            <div className="font-bold text-gray-700 px-4 pt-2 pb-1">
              Leichte Sprache
            </div>
          </div>
        </div>
      </div>
      <div className="h-full flex justify-center mx-4 my-5">
        <div className="w-640px">{ideas}</div>
        <div className="w-312px ml-24px">{sidebar}</div>
      </div>
    </div>
  );
}
