"use client";

import { PathNode } from "@/utils/customer.util";
import { FunctionComponent, useState } from "react";

type Props = {
  baseUrl: string;
  node: PathNode;
};

export const TreeNodeItem: FunctionComponent<Props> = ({ baseUrl, node }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <div className="row">
        <div className="row-title">
          {hasChildren ? (
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "▼" : "▶︎"}
            </button>
          ) : (
            <span aria-hidden>-</span>
          )}
          <p>{node.path}</p>
        </div>
        <a href={`${baseUrl}${node.path}`}>Seite aufrufen</a>
      </div>
      {hasChildren && open && (
        <div style={{ marginLeft: "1.5rem" }}>
          {node.children.map((child) => (
            <TreeNodeItem
              key={"node-" + child.path}
              baseUrl={baseUrl}
              node={child}
            />
          ))}
        </div>
      )}
    </div>
  );
};
