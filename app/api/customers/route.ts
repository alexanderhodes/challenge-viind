import { customer } from "@/data/paths";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(customer);
}
