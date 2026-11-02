import { domains } from "@/data/paths";
import { NextResponse } from "next/server";

const toHostname = (input: string) => {
  try {
    const url = new URL(input.startsWith("https://") ? input : `https://input`);
    return url.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const hostname =
    typeof body?.domain === "string"
      ? toHostname(body.domain.trim())
      : undefined;

  if (!hostname) {
    return NextResponse.json({ error: "Ungültige Domain" }, { status: 400 });
  }

  const domain = domains.find((d) => toHostname(d.baseUrl) === hostname);

  if (!domain) {
    return NextResponse.json(
      { error: "Domain nicht gefunden" },
      { status: 404 },
    );
  }

  return NextResponse.json(domain);
}
