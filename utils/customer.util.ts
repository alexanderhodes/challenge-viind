import { Customer } from "@/data/paths";

export type GroupedPage = {
  parent: string;
  path: string;
  children: GroupedPage[];
};

// "/" always comes first, everything else alphabetically per level
const sortNodes = (nodes: GroupedPage[]) => {
  nodes.sort((a, b) => {
    if (a.parent === "/") return -1;
    if (b.parent === "/") return 1;
    return a.parent.localeCompare(b.parent);
  });
  nodes.forEach((node) => sortNodes(node.children));
};

export const groupCustomerPages = (customer: Customer) => {
  const groupedPages: GroupedPage[] = [];

  customer.pages.forEach((page) => {
    const parts = page.page.split("/").filter(Boolean);

    // "/" has no segments and becomes its own top-level node
    if (parts.length === 0) {
      if (!groupedPages.some((group) => group.parent === "/")) {
        groupedPages.push({ parent: "/", path: "/", children: [] });
      }
      return;
    }

    let level = groupedPages;

    parts.forEach((part, i) => {
      let node = level.find((group) => group.parent === part);

      if (!node) {
        node = {
          parent: part,
          path: `/${parts.slice(0, i + 1).join("/")}/`,
          children: [],
        };
        level.push(node);
      }

      level = node.children;
    });
  });

  sortNodes(groupedPages);

  return groupedPages;
};
