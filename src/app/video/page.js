import { videos } from "@/data/videos";
import VideoShowcase from "./VideoShowcase";

export const metadata = {
  title: "Video Editing & Motion | FarDesign",
  description: "Video editing and motion graphics work",
};

export default function VideoPage() {
  return <VideoShowcase videos={videos} />;
}
