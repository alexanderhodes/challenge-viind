🧩 Hintergrund
Unsere Chatbot-Plattform crawlt als Wissensbasis automatisiert die Webseiten unserer
Kund*innen. Dabei werden von den Kund*innen hinterlegte Domains (z. B.
https://www.example.com) durchsucht und alle gefundenen Seiten werden inklusive
Metadaten gespeichert.
Typische Beispiele für Seiten und deren Pfade:
• /
• /produkte
• /produkte/software
• /produkte/hardware
• /ueber-uns
• /ueber-uns/team

🚀 Deine Aufgabe
Die vom Chatbot gefundenen Inhalte sollen über eine UI einsehbar sein. Erstelle ein kleines
Frontend, das alle gecrawlten Seiten einer Domain in einer Baumstruktur darstellt.
Es soll möglich sein:

1. Die Struktur der Pfade als Navigationsbaum zu sehen.
2. Pfade auf- und zuzuklappen.
3. Einen Pfad auszuwählen und die zugehörigen Inhalte/Seiten einzusehen.

Das Ergebnis muss nicht schön aussehen – Layout, Styling und visuelle Details sind
ausdrücklich kein Schwerpunkt dieser Challenge.
Wichtig ist einzig, dass erkennbar ist:

- wie du die Aufgabe technisch angehst,
- wie du die Daten strukturierst,
- wie du die Funktionalität umsetzt.

Es existiert kein Backend-Service, der diese Daten über eine echte API ausliefert.
Für die Challenge soll daher eine fiktive API definiert und im Frontend über Mock-Daten
simuliert werden.
Die verwendeten Technologien kannst du dir selbst aussuchen. Bitte lade deinen lauffähigen
Code in ein Git-Repository und stelle uns dies zur Verfügung. Dort sollte auch kurz
dokumentiert sein, wie man den Code ausführen kann.
