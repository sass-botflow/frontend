export type VideoTestimonialNiche =
  | "dental"
  | "ecommerce"
  | "restaurant"
  | "beauty"
  | "auto"
  | "agency";

export interface VideoTestimonialAsset {
  id: string;
  niche: VideoTestimonialNiche;
  /** Dot color for the niche badge */
  dotColor: string;
  /** Poster gradient when video is loading */
  posterGradient: string;
  /** Video source — replace with your own UGC clips in /public/testimonials/ */
  src: string;
}

export const videoTestimonialAssets: VideoTestimonialAsset[] = [
  {
    id: "dental",
    niche: "dental",
    dotColor: "#34d399",
    posterGradient: "linear-gradient(160deg, #1e3a5f 0%, #0f172a 100%)",
    src: "https://videos.pexels.com/video-files/7190250/7190250-hd_720_1280_30fps.mp4",
  },
  {
    id: "ecommerce",
    niche: "ecommerce",
    dotColor: "#a3e635",
    posterGradient: "linear-gradient(160deg, #3b1f5e 0%, #1a0f2e 100%)",
    src: "https://videos.pexels.com/video-files/3195394/3195394-hd_1080_1920_25fps.mp4",
  },
  {
    id: "restaurant",
    niche: "restaurant",
    dotColor: "#fbbf24",
    posterGradient: "linear-gradient(160deg, #4a2511 0%, #1c0f08 100%)",
    src: "https://videos.pexels.com/video-files/6774633/6774633-hd_720_1280_25fps.mp4",
  },
  {
    id: "beauty",
    niche: "beauty",
    dotColor: "#f472b6",
    posterGradient: "linear-gradient(160deg, #5c1a3a 0%, #1a0a12 100%)",
    src: "https://videos.pexels.com/video-files/6195807/6195807-hd_720_1280_25fps.mp4",
  },
  {
    id: "auto",
    niche: "auto",
    dotColor: "#38bdf8",
    posterGradient: "linear-gradient(160deg, #1a2e3b 0%, #0a1218 100%)",
    src: "https://videos.pexels.com/video-files/7567533/7567533-hd_720_1280_25fps.mp4",
  },
  {
    id: "agency",
    niche: "agency",
    dotColor: "#818cf8",
    posterGradient: "linear-gradient(160deg, #2d1b4e 0%, #120a1f 100%)",
    src: "https://videos.pexels.com/video-files/8348328/8348328-hd_720_1280_25fps.mp4",
  },
];
