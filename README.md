# Challenge viind

Next.js Web-App (TypeScript, React Query), die die gecrawlten Seiten einer Domain als Baumstruktur darstellt.

## Starten

Benötigt Node.js 20 oder neuer.

```
npm install
npm run dev
```

Die App läuft dann unter http://localhost:3000. In dem Eingabefeld kann Domain eingeben werden (vorbelegt: `https://www.hef-rof.de`). Beim Klicken auf "Seiten laden" wird die Mock-API aufgerufen und die entsprechenden Knoten angezeigt. Knoten lassen sich auf- und zuklappen, ein Klick auf einen Pfad zeigt rechts die Inhalte und Metadaten der Seite.

## Fiktive API

Es gibt kein echtes Backend. Die Mock-Daten liegen in `data/paths.ts` und werden über eine Next.js Route ausgeliefert.

`POST /api/pages`

```json
{ "domain": "https://www.hef-rof.de" }
```

Antwort `200`:

```json
{
  "baseUrl": "https://www.hef-rof.de",
  "pages": [
    {
      "path": "/ueber-uns/team/",
      "title": "Team",
      "description": "…",
      "content": "…",
      "statusCode": 200,
      "crawledAt": "2026-10-01T08:00:00.000Z"
    }
  ]
}
```

Fehler: `400` bei ungültiger Domain, `404` wenn die Domain nicht gecrawlt wurde. Die Domain darf mit oder ohne `https://` und `www.` angegeben werden.

## Aufbau

- `utils/tree.util.ts`: baut aus der flachen Pfadliste den Baum. Pfade werden normalisiert, fehlende Zwischenknoten ergänzt und sortiert.
- `components/`: Baum (`domain-tree`, `tree-node-item`) und Detailansicht (`page-detail`).
- `hooks/use-domain-pages.ts`: ruft die API per React Query auf.
