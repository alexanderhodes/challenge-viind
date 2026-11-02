export type CrawledPage = {
  path: string;
  title: string;
  description: string;
  content: string;
  statusCode: number;
  crawledAt: string;
};

export type CrawledDomain = {
  baseUrl: string;
  pages: CrawledPage[];
};

type DomainSource = {
  baseUrl: string;
  paths: string[];
};

const crawlStart = Date.now();

const toTitle = (path: string) => {
  const last = path.split("/").filter(Boolean).pop();
  if (!last) return "Startseite";
  const words = last.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
};

// Mock metadata is derived from the path, so the crawler output stays deterministic
const toCrawledPage = (baseUrl: string, path: string, index: number) => {
  const title = toTitle(path);

  return {
    path,
    title,
    description: `Beschreibung der Seite "${title}".`,
    content: `Gecrawlter Inhalt von ${baseUrl}${path}\n\nDies ist Beispieltext der Seite "${title}", wie er vom Crawler als Wissensbasis für den Chatbot gespeichert wird.`,
    statusCode: 200,
    crawledAt: new Date(crawlStart + index * 60_000).toISOString(),
  } satisfies CrawledPage;
};

const sources: DomainSource[] = [
  {
    baseUrl: "https://www.hef-rof.de",
    paths: [
      "/",
      "/leben-in-hef-rof/",
      "/leben-in-hef-rof/bauen-wohnen/",
      "/leben-in-hef-rof/einwanderung-aufenthalt-asyl/",
      "/leben-in-hef-rof/engagement-hobby/",
      "/leben-in-hef-rof/gesundheit-mensch-tier/",
      "/leben-in-hef-rof/kfz-verkehr/",
      "/leben-in-hef-rof/kinder-jugend-familie/",
      "/leben-in-hef-rof/kommunales-jobcenter/",
      "/leben-in-hef-rof/ordnung-sicherheit/",
      "/leben-in-hef-rof/pflege-senioren-sozialhilfe/",
      "/leben-in-hef-rof/schule-bildung-sport/",
      "/landkreis-verwaltung/",
      "/landkreis-verwaltung/einrichtungen/",
      "/landkreis-verwaltung/verwaltung/",
      "/landkreis-verwaltung/der-landkreis/",
      "/landkreis-verwaltung/politik-wahlen/",
      "/landkreis-verwaltung/karriere-im-landratsamt/",
      "/landkreis-verwaltung/verwaltung/ansprechpersonen-von-a-z/",
      "/landkreis-verwaltung/verwaltung/service-verwaltung/",
      "/landkreis-verwaltung/verwaltung/unsere-leistungen-von-a-z/",
      "/landkreis-verwaltung/verwaltung/presse/",
      "/landkreis-verwaltung/verwaltung/verwaltungsspitze/",
      "/landkreis-verwaltung/verwaltung/oeffentliche-bekanntmachungen/",
      "/landkreis-verwaltung/verwaltung/frauen-gleichstellung/",
      "/landkreis-verwaltung/verwaltung/anfahrt-und-lageplaene/",
      "/landkreis-verwaltung/verwaltung/finanzen-haushalt/",
      "/wirtschaft-zukunftsregion/wirtschaft-zukunftsregion/ausschreibungen-zentrale-vergabestelle/",
      "/landkreis-verwaltung/verwaltung/ansprechpersonen-von-a-z/",
      "/wirtschaft-zukunftsregion/",
      "/wirtschaft-zukunftsregion/landwirtschaft-forst/",
      "/wirtschaft-zukunftsregion/reststoffe/",
      "/wirtschaft-zukunftsregion/umwelt-naturschutz/",
      "/wirtschaft-zukunftsregion/wirtschaft-zukunftsregion/",
      "/landkreis-verwaltung/verwaltung/presse/news-archiv/",
      "/news/2026/september/stadtradeln-fast-fuenfmal-um-die-welt-rund-190-000-kilometer-im-landkreis-hersfeld-rotenburg-geradelt/",
      "/news/2026/august/sanierung-und-funktionserweiterung-des-dgh-schletzenrod-kann-beginnen/",
      "/news/2026/august/foerderung-fuer-sanierung-des-denkmalgeschuetzten-backhauses-in-odensachsen/",
      "/datenschutz/",
      "/erklaerung-barrierefreiheit/",
      "/impressum/",
      "/widerspruch/",
      "/leichte-sprache/",
      "/landkreis-verwaltung/verwaltung/presse/",
      "/landkreis-verwaltung/verwaltung/unsere-leistungen-von-a-z/",
      "/buergerservice/abteilungen/HES:department:29248",
      "/news/2026/oktober/abc-cafe-ermoeglicht-menschen-die-integration-in-bad-hersfeld/",
      "/news/2026/oktober/abend-des-sports-2027-nominierungen-sind-ab-sofort-moeglich/",
      "/news/2026/september/minderjaehrige-im-digitalen-raum/",
      "/news/2026/september/stadtradeln-fast-fuenfmal-um-die-welt-rund-190-000-kilometer-im-landkreis-hersfeld-rotenburg-geradelt/",
    ],
  },
];

export const domains: CrawledDomain[] = sources.map(({ baseUrl, paths }) => ({
  baseUrl,
  pages: [...new Set(paths)].map((path, index) =>
    toCrawledPage(baseUrl, path, index),
  ),
}));
