import { PathNode } from "@/utils/tree.util";
import { FunctionComponent } from "react";

type Props = {
  baseUrl: string;
  node?: PathNode;
};

export const PageDetail: FunctionComponent<Props> = ({ baseUrl, node }) => {
  if (!node) {
    return <p>Pfad im Baum auswählen, um die Inhalte zu sehen.</p>;
  }

  const { page } = node;
  const url = `${baseUrl}${node.path}`;

  return (
    <article>
      <h1>{page?.title ?? node.segment}</h1>
      <p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>
      {page ? (
        <>
          <div>
            <p className="label">Beschreibung</p>
            <p>{page.description}</p>
            <p className="label">Status</p>
            <p>{page.statusCode}</p>
            <p className="label">Gecrawlt am</p>
            <p>{new Date(page.crawledAt).toLocaleString("de-DE")}</p>
          </div>
          <h2 className="label">Inhalt</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{page.content}</p>
        </>
      ) : (
        <p>Für diesen Pfad wurde keine eigene Seite gecrawlt.</p>
      )}
    </article>
  );
};
