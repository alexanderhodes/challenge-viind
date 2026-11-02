import { CrawledDomain } from "@/data/paths";
import { useMutation } from "@tanstack/react-query";

export const useDomainPages = () =>
  useMutation<CrawledDomain, Error, string>({
    mutationFn: async (domain) => {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.error ?? `HTTP ${response.status}`);
      return body;
    },
  });
