import { PathNode } from "@/utils/tree.util";
import { FunctionComponent } from "react";
import { TreeNodeItem } from "./tree-node-item";

type Props = {
  roots: PathNode[];
  selectedPath?: string;
  onSelect: (path: string) => void;
};

export const DomainTree: FunctionComponent<Props> = ({
  roots,
  selectedPath,
  onSelect,
}) => (
  <nav>
    {roots.map((node) => (
      <TreeNodeItem
        key={"node-" + node.path}
        node={node}
        selectedPath={selectedPath}
        onSelect={onSelect}
      />
    ))}
  </nav>
);
