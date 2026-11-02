"use client";

import { DomainTree } from "@/components/domain-tree";
import { PageDetail } from "@/components/page-detail";
import { useDomainPages } from "@/hooks/use-domain-pages";
import { buildPathTree, findNode } from "@/utils/tree.util";
import { FormEvent, useMemo, useState } from "react";

export default function Home() {
  const [domain, setDomain] = useState("https://www.hef-rof.de");
  const [selectedPath, setSelectedPath] = useState<string>();
  const { data, error, isPending, mutate } = useDomainPages();

  const roots = useMemo(() => (data ? buildPathTree(data.pages) : []), [data]);
  const selectedNode = selectedPath ? findNode(roots, selectedPath) : undefined;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSelectedPath(undefined);
    mutate(domain);
  };

  return (
    <main className="main">
      <form onSubmit={handleSubmit} className="row-title">
        <label htmlFor="domain">Domain</label>
        <input
          id="domain"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          style={{ border: "1px solid gray", padding: "0 8px" }}
        />
        <button type="submit" className="search-button" disabled={isPending}>
          Seiten laden
        </button>
      </form>

      {isPending && <p>Daten werden geladen</p>}
      {error && <p>Fehler beim Laden der Daten: {error.message}</p>}

      {data && !isPending && (
        <div className="split">
          <DomainTree
            roots={roots}
            selectedPath={selectedPath}
            onSelect={setSelectedPath}
          />
          <PageDetail baseUrl={data.baseUrl} node={selectedNode} />
        </div>
      )}
    </main>
  );
}
