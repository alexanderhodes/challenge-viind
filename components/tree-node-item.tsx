"use client";

import { PathNode } from "@/utils/tree.util";
import { FunctionComponent, useState } from "react";

type Props = {
  node: PathNode;
  selectedPath?: string;
  onSelect: (path: string) => void;
};

export const TreeNodeItem: FunctionComponent<Props> = ({
  node,
  selectedPath,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children.length > 0;
  const selected = node.path === selectedPath;

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
          <button
            type="button"
            aria-current={selected}
            style={{ fontWeight: selected ? "bold" : undefined }}
            onClick={() => onSelect(node.path)}
          >
            {node.segment}
          </button>
        </div>
      </div>
      {hasChildren && open && (
        <div style={{ marginLeft: "1.5rem" }}>
          {node.children.map((child) => (
            <TreeNodeItem
              key={"node-" + child.path}
              node={child}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
