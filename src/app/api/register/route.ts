import { NextResponse } from "next/server";

export async function POST() {
  return new NextResponse("Noch keine Datenbank", { status: 200 });
}
