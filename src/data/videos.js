// Add new videos by copying one object and pasting it inside this array.
// Only change the text values. Keep every id unique, like video-3, video-4, video-5.
//
// Template:
// {
//   id: "video-3",
//   title: "Your Video Title",
//   type: "Reel",
//   description: "Short description of the work.",
//   embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
//   ratio: "portrait", // use "portrait" for reels, "landscape" for wide videos
//   thumbnail: "", // optional: add a custom image path if you do not want the YouTube thumbnail
//   startingLikes: 0,
// },

export const videos = [
  {
    id: "video-1",
    title: "Brand Ad Edit",
    type: "Landscape Video",
    description:
      "A polished brand video edit focused on pacing, clean transitions, and product-led storytelling.",
    embedUrl: "https://www.youtube.com/embed/OLV3NGmVR7k",
    ratio: "landscape",
    startingLikes: 24,
  },
  {
    id: "video-2",
    title: "Social Reel",
    type: "Reel",
    description:
      "A short-form reel treatment designed for quick hooks, smooth motion, and mobile-first viewing.",
    embedUrl: "https://www.youtube.com/embed/OLV3NGmVR7k",
    ratio: "portrait",
    startingLikes: 18,
  },
];
