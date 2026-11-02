import { CrawledPage } from "@/data/paths";

export type PathNode = {
  segment: string;
  path: string;
  // undefined for intermediate nodes that were not crawled themselves
  page?: CrawledPage;
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

// Unifies "/produkte", "produkte/" and "/produkte/?a=1" to "/produkte/"
export const normalizePath = (path: string) => {
  const segments = path.split(/[?#]/)[0].split("/").filter(Boolean);
  return segments.length ? `/${segments.join("/")}/` : "/";
};

export const buildPathTree = (pages: CrawledPage[]) => {
  const roots: PathNode[] = [];

  pages.forEach((page) => {
    const path = normalizePath(page.path);
    const segments = path.split("/").filter(Boolean);

    // "/" has no segments and becomes its own top-level node
    if (segments.length === 0) {
      if (!roots.some((root) => root.path === "/")) {
        roots.push({ segment: "/", path: "/", page, children: [] });
      }
      return;
    }

    let siblings = roots;

    segments.forEach((segment, i) => {
      const isLast = i === segments.length - 1;
      let node = siblings.find((sibling) => sibling.segment === segment);

      if (!node) {
        node = {
          segment,
          path: `/${segments.slice(0, i + 1).join("/")}/`,
          children: [],
        };
        siblings.push(node);
      }

      // intermediate nodes created earlier get their page once it shows up
      if (isLast && !node.page) node.page = page;

      siblings = node.children;
    });
  });

  sortTree(roots);

  return roots;
};

export const findNode = (
  nodes: PathNode[],
  path: string,
): PathNode | undefined => {
  for (const node of nodes) {
    if (node.path === path) return node;
    const found = findNode(node.children, path);
    if (found) return found;
  }
};
