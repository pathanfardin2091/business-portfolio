import { NextResponse } from "next/server";
import { getClientLogos } from "@/lib/clientLogos";

export async function GET() {
  const logos = await getClientLogos();

  return NextResponse.json(logos, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
