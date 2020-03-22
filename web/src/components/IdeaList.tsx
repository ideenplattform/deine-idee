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
        labels: [],
      },
      {
        title: "Unterstützung von Personen die kein Internetzugriff haben",
        issue:
          "Es gibt bereits zahlreiche Webseiten, Chatgruppen(Whatsapp/Telegram) und App's, welche die Kommunikation zwischen Hilfesuchenden und Leuten die Hilfe anbieten erleichtert.Z.B.:- Webseite: http://www.quarantaenehelden.org/- Telegram Gruppe: https://t.me/CoronaSoliDarmstadt- Weite Gruppen: https://pad.systemli.org/p/9M9GOR5J4Zjnd74dXInr-keepWas ist aber mit Leuten die keinen Zugriff auf solche Medien hat z.B. die ältere Generation?Ein Vorschlag wäre eine Art Hotline einzurichten die autonom arbeitet.Die Hotline nimmt den Anruf entgegen und die Person kann ihre Bedürfnisse einem Anrufbeantworter oder Bot mitteilen.Die Sprache zu Texterkennung ist heutzutage sehr fortgeschritten, Google bietet hier sogar einen Eigenen Service dazu an.Die Texterkennung kann dann direkt in die Webseiten oder App übertragen werden z.B. quarantaenehelden.org hier können sich dann Helfer direkt telefonisch bei der Hilfesuchenden Person melden.Der Bot könnte natürlich Zusätzlich auch noch Informationen über den Aktuellen Stand über Corona(COVID-19) weitergeben.Durch Sprachsynthese wäre es sogar möglich das ein Rückruf getätigt wird um ggf. Informationen weiterzuleiten.",
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
            <div className="">{issue}</div>
            <div>{challenge}</div>
            <div>{approach}</div>
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

  const sidebar = (
    <div className="rounded h-48 bg-white rounded border border-gray-400"></div>
  );

  return (
    <div className="h-full flex justify-center">
      <div className="w-640px">{ideas}</div>
      <div className="w-312px ml-4">{sidebar}</div>
    </div>
  );
}
