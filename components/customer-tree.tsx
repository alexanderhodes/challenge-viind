import { Customer } from "@/data/paths";
import { buildPathTree } from "@/utils/customer.util";
import { FunctionComponent } from "react";
import { TreeNodeItem } from "./tree-node-item";

type Props = {
  customer: Customer;
};

export const CustomerTree: FunctionComponent<Props> = ({ customer }) => {
  const roots = buildPathTree(customer);

  return (
    <>
      <p>Kunde: {customer.id}</p>
      {roots.map((node) => (
        <TreeNodeItem
          key={"node-" + node.path}
          baseUrl={customer.baseUrl}
          node={node}
        />
      ))}
    </>
  );
};
