import { NextResponse } from "next/server";
import {
  getEngagement,
  recordLike,
  recordView,
} from "@/lib/reelEngagementStore";

export const dynamic = "force-dynamic";

const MEANINGFUL_SECONDS = 7;
const MEANINGFUL_PERCENT = 0.3;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoIds = (searchParams.get("ids") || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const viewerId = searchParams.get("viewerId") || "";

  if (!videoIds.length) {
    return NextResponse.json({ engagement: {}, likedVideos: {} });
  }

  const engagement = await getEngagement(videoIds, viewerId);
  return NextResponse.json(engagement);
}

export async function POST(request) {
  const body = await request.json();
  const videoId = String(body.videoId || "");
  const action = String(body.action || "");
  const identity = {
    viewerId: String(body.viewerId || ""),
    sessionId: String(body.sessionId || ""),
    fingerprint: String(body.fingerprint || ""),
  };

  if (!videoId || !identity.viewerId) {
    return NextResponse.json(
      { error: "Missing video or viewer identity." },
      { status: 400 }
    );
  }

  if (action === "view") {
    const watchSeconds = Number(body.watchSeconds || 0);
    const completionRate = Number(body.completionRate || 0);

    if (watchSeconds < MEANINGFUL_SECONDS && completionRate < MEANINGFUL_PERCENT) {
      return NextResponse.json(
        { counted: false, error: "Watch threshold not met." },
        { status: 202 }
      );
    }

    const result = await recordView(videoId, identity, {
      watchSeconds,
      completionRate,
    });

    return NextResponse.json(result);
  }

  if (action === "like" || action === "unlike") {
    const result = await recordLike(videoId, identity, action === "like");
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
}
