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
