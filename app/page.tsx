"use client";

import { CustomerTree } from "@/components/customer-tree";
import { Customer } from "@/data/paths";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, error, isPending } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await fetch("/api/customers");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    },
  });

  if (isPending) {
    return (
      <main>
        <p>Daten werden geladen</p>
      </main>
    );
  }

  if (!data || error) {
    return (
      <main>
        <p>Fehler beim Laden der Daten</p>
      </main>
    );
  }

  return (
    <main className="main">
      {data.map((d) => (
        <CustomerTree key={d.id} customer={d} />
      ))}
    </main>
  );
}
