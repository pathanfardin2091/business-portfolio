// Add new videos by copying one object and pasting it inside this array.
// Keep every id unique, like video-3, video-4, video-5.
//
// You can paste:
// - YouTube watch, shorts, youtu.be, or embed links
// - Instagram reel/post/tv links
// - Full Pinterest pin links, like https://www.pinterest.com/pin/1234567890/
// - Any direct embed URL that works inside an iframe
//
// Note: Pinterest short links like https://pin.it/... cannot always be embedded
// directly. Open the pin and paste the full pinterest.com/pin/... link instead.
//
// Template:
// {
//   id: "video-3",
//   title: "Your Video Title",
//   type: "Reel",
//   description: "Short description of the work.",
//   videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
//   ratio: "portrait", // use "portrait" for reels, "landscape" for wide videos
//   thumbnail: "", // optional, useful for Instagram/Pinterest cards
//   startingLikes: 0,
// },

export const videos = [
  {
    id: "video-1",
    title: "Brand Ad Edit",
    type: "Landscape Video",
    description:
      "A polished brand video edit focused on pacing, clean transitions, and product-led storytelling.",
    videoUrl: "https://youtube.com/shorts/lsEp0gHTjbE?feature=share",
    ratio: "portrait",
    startingLikes: 0,
  },
  {
    id: "video-2",
    title: "Social Reel",
    type: "Reel",
    description:
      "A short-form reel treatment designed for quick hooks, smooth motion, and mobile-first viewing.",
    videoUrl: "https://youtu.be/13k1p0oCR1g?si=nu5ZgTj3qxuuZYu2",
    
    ratio: "portrait",
    startingLikes: 0,
  },
  
];


