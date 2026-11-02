import { customers } from "@/data/paths";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(customers);
}
