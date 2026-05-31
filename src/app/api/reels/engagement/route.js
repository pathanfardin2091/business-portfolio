import { NextResponse } from "next/server";
import {
  getEngagement,
  recordLike,
  recordView,
} from "@/lib/reelEngagementStore";
import { videos } from "@/data/videos";

export const dynamic = "force-dynamic";

const MEANINGFUL_SECONDS = 7;
const MEANINGFUL_PERCENT = 0.3;
const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
};
const initialEngagementByVideoId = videos.reduce((result, video) => {
  result[video.id] = {
    views: video.startingViews || 0,
    uniqueViews: video.startingViews || 0,
    likes: video.startingLikes || 0,
  };

  return result;
}, {});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoIds = (searchParams.get("ids") || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const viewerId = searchParams.get("viewerId") || "";

    if (!videoIds.length) {
      return jsonNoStore({ engagement: {}, likedVideos: {} });
    }

    const engagement = await getEngagement(
      videoIds,
      viewerId,
      initialEngagementByVideoId
    );
    return jsonNoStore(engagement);
  } catch {
    return jsonNoStore({ engagement: {}, likedVideos: {} });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const videoId = String(body.videoId || "");
    const action = String(body.action || "");
    const identity = {
      viewerId: String(body.viewerId || ""),
      sessionId: String(body.sessionId || ""),
      fingerprint: String(body.fingerprint || ""),
    };

    if (!videoId || !identity.viewerId) {
      return jsonNoStore(
        { error: "Missing video or viewer identity." },
        { status: 400 }
      );
    }

    if (action === "view") {
      const watchSeconds = Number(body.watchSeconds || 0);
      const completionRate = Number(body.completionRate || 0);

      if (
        watchSeconds < MEANINGFUL_SECONDS &&
        completionRate < MEANINGFUL_PERCENT
      ) {
        return jsonNoStore(
          { counted: false, error: "Watch threshold not met." },
          { status: 202 }
        );
      }

      const result = await recordView(
        videoId,
        identity,
        {
          watchSeconds,
          completionRate,
        },
        initialEngagementByVideoId[videoId]
      );

      return jsonNoStore(result);
    }

    if (action === "like" || action === "unlike") {
      const result = await recordLike(
        videoId,
        identity,
        action === "like",
        initialEngagementByVideoId[videoId]
      );
      return jsonNoStore(result);
    }

    return jsonNoStore({ error: "Unsupported action." }, { status: 400 });
  } catch {
    return jsonNoStore(
      { error: "Unable to save reel engagement right now." },
      { status: 503 }
    );
  }
}

function jsonNoStore(body, init = {}) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...noStoreHeaders,
      ...init.headers,
    },
  });
}
