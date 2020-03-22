import React, { ReactElement } from "react";
import gql from "graphql-tag";
import wirvsvirusLogo from "../images/wirvsvirus-logo.png";

import { Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";

const IDEAS = gql`
  {
    ideas {
      title
    }
  }
`;

const categories = [
  "Supermarkt Status",
  "Krankenhäuser",
  "Social Distancing",
  "Lebensmittel-Matching",
  "Analoge Unterstützung",
  "Mental Health",
  "Hilfsmittelverteilung",
  "Kreativer Gesundheitsschutz",
];

export function Dashboard(): JSX.Element {
  // const { loading, error, data } = useQuery(IDEAS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  const data = {
    ideas: [
      {
        id: 1,
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
        id: 2,
        title: "Unterstützung von Personen die kein Internetzugriff haben",
        issue:
          "Es gibt bereits zahlreiche Webseiten, Chatgruppen(Whatsapp/Telegram) und App's, welche die Kommunikation zwischen Hilfesuchenden und Leuten die Hilfe anbieten erleichtert.\n\nz.B.:\n* Webseite: [quarantaenehelden.org](http://www.quarantaenehelden.org/)\n* Telegram Gruppe: https://t.me/CoronaSoliDarmstadt\n* Weite Gruppen: https://pad.systemli.org/p/9M9GOR5J4Zjnd74dXInr-keep\nWas ist aber mit Leuten die keinen Zugriff auf solche Medien hat z.B. die ältere Generation? Ein Vorschlag wäre eine Art Hotline einzurichten die autonom arbeitet.",
        challenge:
          "Wie können wir Personen ohne Internetzugriff Informationen bereitstellen und Unterstützung anbieten?",
        approach:
          "Die Lösungen sind bisher rein Internet gebunden. Es gibt bereits zahlreiche Webseiten, Chatgruppen(Whatsapp/Telegram) und App's, welche die Kommunikation zwischen Hilfesuchenden und Leuten die Hilfe anbieten erleichtert.\n\n z.B.:\n* Webseite: http://www.quarantaenehelden.org/\n* Telegram Gruppe: https://t.me/CoronaSoliDarmstadt\n* Weite Gruppen: https://pad.systemli.org/p/9M9GOR5J4Zjnd74dXInr-keep",
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

  const renderers = {
    list: (item: any): ReactElement => (
      <ul className="list-disc pl-4">{item.children}</ul>
    ),
    link: (item: any): ReactElement => (
      <a className="text-blue-400" href={item.href}>
        {item.children}
      </a>
    ),
  };

  const ideas = data.ideas.map(
    ({ id, title, issue, challenge, approach, labels }) => (
      <div>
        <div className="bg-white rounded p-4 border border-gray-400 mb-4">
          <div className="mb-2">
            <Link to="/wirvsvirus">
              <div className="py-2 flex items-center">
                <img className="h-8 rounded-full" src={wirvsvirusLogo} />
                <div className="font-bold px-2">#WirVsVirus</div>
                <div className="px-3 text-gray-400 text-xs">
                  vor einer Stunde
                </div>
              </div>
            </Link>
            <div className="font-bold text-lg mb-2">
              <Link to={{ pathname: `/idea/${id}` }}>{title}</Link>
            </div>
            <div className="font-light uppercase text-gray-700 text-xs tracking-wider mb-1">
              Problem
            </div>
            <div className="mb-3">
              <ReactMarkdown source={issue} renderers={renderers} />
            </div>
            <div className="font-light uppercase text-gray-700 text-xs tracking-wider mb-1">
              Herausforderung
            </div>
            <div className="mb-3">
              <ReactMarkdown source={challenge} renderers={renderers} />
            </div>
            {approach && (
              <div className="font-light uppercase text-gray-700 text-xs tracking-widest mb-1">
                Lösungansatz
              </div>
            )}
            <div className="mb-3">
              <ReactMarkdown source={approach} renderers={renderers} />
            </div>
          </div>
          <div>
            {labels!.map(label => (
              <span
                className={`border-2 border-${label.color} hover:bg-${label.color} text-sm rounded-full px-3 py-1 m-1`}
              >
                {label.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  );

  const categoriesElements = categories.map(category => (
    <div className="font-normal">{category}</div>
  ));

  const sidebar = (
    <div>
      <div className="flex flex-col rounded bg-white rounded border border-gray-400 p-3 mb-5">
        <div className="flex flex-wrap">
          <div className="flex flex-col w-1/2 py-1">
            <div className="font-medium text-lg">800</div>
            <div className="font-bold">Ideen</div>
          </div>
          <div className="flex flex-col w-1/2 py-1">
            <div className="font-medium text-lg">42t</div>
            <div className="font-bold">Teilnehmer</div>
          </div>
          <div className="flex flex-col w-1/2 py-1">
            <div className="font-medium text-lg">42</div>
            <div className="font-bold">Hackathons</div>
          </div>
          <div className="flex flex-col w-1/2 py-1">
            <div className="font-medium text-lg">12</div>
            <div className="font-bold">fertige Projekte</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded bg-white rounded border border-gray-400 p-3">
        <div className="font-bold mb-2">Beliebte Kategorien</div>
        <div className="mb-5">
          <div className="flex flex-col p-2">{categoriesElements}</div>
        </div>
      </div>
    </div>
  );

  const cards = [1, 2, 3, 4].map(() => (
    <Link to="/wirvsvirus" className="w-1/4 mx-6">
      <div className="rounded-lg p-5 card text-white h-32 flex flex-col justify-end">
        <div>#WirVsVirus</div>
        <div className="text-xs font-light">Hackathon gegen Coronavirus</div>
      </div>
    </Link>
  ));

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col w-976px">
          <div className="text-gray-800 px-4 pt-2 pb-1">
            <div className="font-bold">Deine Ideen des Tages</div>
            <div className="flex justify-between my-4">{cards}</div>
            <div className="font-bold">Beliebte Ideen</div>
            <div className="h-full flex justify-center mx-4 my-3">
              <div className="w-640px">{ideas}</div>
              <div className="w-312px ml-24px">{sidebar}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
