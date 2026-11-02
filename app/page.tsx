"use client";

import { CustomerPages } from "@/components/customer-pages";
import { Customer } from "@/data/paths";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, error, isPending } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/customers");

        return response.json();
      } catch (e) {
        Promise.reject(e);
      }
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
        <CustomerPages key={d.id} customer={d} />
      ))}
    </main>
  );
}
