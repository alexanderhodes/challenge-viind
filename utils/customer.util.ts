import { Customer } from "@/data/paths";

export type PathNode = {
  segment: string;
  path: string;
  children: PathNode[];
};

// "/" always comes first, everything else alphabetically per level
const sortTree = (nodes: PathNode[]) => {
  nodes.sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.segment.localeCompare(b.segment);
  });
  nodes.forEach((node) => sortTree(node.children));
};

export const buildPathTree = (customer: Customer) => {
  const roots: PathNode[] = [];

  customer.pages.forEach(({ path }) => {
    const segments = path.split("/").filter(Boolean);

    // "/" has no segments and becomes its own top-level node
    if (segments.length === 0) {
      if (!roots.some((root) => root.path === "/")) {
        roots.push({ segment: "/", path: "/", children: [] });
      }
      return;
    }

    let siblings = roots;

    segments.forEach((segment, i) => {
      let node = siblings.find((sibling) => sibling.segment === segment);

      if (!node) {
        node = {
          segment,
          path: `/${segments.slice(0, i + 1).join("/")}/`,
          children: [],
        };
        siblings.push(node);
      }

      siblings = node.children;
    });
  });

  sortTree(roots);

  return roots;
};
