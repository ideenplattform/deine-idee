import React, { ReactElement } from "react";
import gql from "graphql-tag";
import wirvsvirus from "../images/wirvsvirus3.png";
import wirvsvirusLogo from "../images/wirvsvirus-logo.png";
import logo from "../icons/idea.svg";

import { useQuery } from "@apollo/react-hooks";

import { Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";

const IDEAS = gql`
  {
    ideas {
      title
    }
  }
`;

export function IdeaList(props): JSX.Element {
  // const { loading, error, data } = useQuery(IDEAS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  const id = props.match.params.id;

  const pages = [
    {
      id: "wirvsvirus",
      logo: wirvsvirusLogo,
      background: wirvsvirus,
      description:
        "Wie können wir als Gesellschaft die Herausforderungen, die im Zuge der Corona Krise entstehen, mit neuen Lösungen gemeinsam meistern?",
      stats: {
        ideas: 800,
        participants: "42t",
      },
    },
    {
      id: "deineidee",
      logo: logo,
      background: logo,
      description:
        "Die Open Source Plattform zum Ideenmanagement auf gesellschaftlicher Ebene. Die agile Lösungsschmiede für Kreative und Engagierte.",
      stats: {
        ideas: "∞",
        participants: "7",
      },
    },
  ];

  const page = pages.filter(i => i.id == id)[0];

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

  const sidebar = (
    <div className="flex flex-col rounded bg-white rounded border border-gray-400 p-3">
      <div className="font-bold mb-2">{page.title}</div>
      <div className="mb-5">{page.description}</div>
      <div className="flex">
        <div className="flex flex-col w-1/3">
          <div className="font-medium text-lg">{page.stats.ideas}</div>
          <div className="font-bold">Ideen</div>
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-lg">{page.stats.participants}</div>
          <div className="font-bold">Teilnehmer</div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-center h-200px">
        <img className="h-200px" src={page.background} />
      </div>
      <div className="flex justify-center bg-white">
        <div className="flex flex-col w-976px bg-white">
          <div className="flex mb-3">
            <img className="h-20 rounded-full -mt-4" src={page.logo} />
            <div>
              <div className="font-bold text-2xl p-2">{page.title}</div>
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
