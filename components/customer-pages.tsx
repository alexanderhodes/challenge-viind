import { Customer } from "@/data/paths";
import { groupCustomerPages } from "@/utils/customer.util";
import { FunctionComponent } from "react";
import { PagesGroup } from "./pages-group";

type Props = {
  customer: Customer;
};

export const CustomerPages: FunctionComponent<Props> = ({ customer }) => {
  const group = groupCustomerPages(customer);

  return (
    <>
      <p>Kunde: {customer.id}</p>
      {group.map((g) => (
        <PagesGroup
          key={"group-" + g.path}
          baseUrl={customer.baseUrl}
          group={g}
        />
      ))}
    </>
  );
};
