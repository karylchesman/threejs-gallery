import { UserConfig } from "vite";

export default {
  base: process.env.NODE_ENV === "production" ? "/threejs-gallery/" : "",
} as UserConfig;
