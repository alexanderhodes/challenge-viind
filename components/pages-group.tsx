"use client";

import { GroupedPage } from "@/utils/customer.util";
import { FunctionComponent, useState } from "react";

type Props = {
  baseUrl: string;
  group: GroupedPage;
};

export const PagesGroup: FunctionComponent<Props> = ({ baseUrl, group }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = group.children.length > 0;

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
          <p>{group.path}</p>
        </div>
        <a href={`${baseUrl}${group.path}`}>Seite aufrufen</a>
      </div>
      {hasChildren && open && (
        <div style={{ marginLeft: "1.5rem" }}>
          {group.children.map((child) => (
            <PagesGroup
              key={"page-" + child.path}
              baseUrl={baseUrl}
              group={child}
            />
          ))}
        </div>
      )}
    </div>
  );
};
