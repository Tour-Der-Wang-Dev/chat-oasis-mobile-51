import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["cdc2d633-8103-4e54-b7d1-5f3c4048543e-00-19sart8x7f8a5.sisko.replit.dev"]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    sitemap({
      hostname: "https://yourdomain.com", // Replace with your actual domain
      dynamicRoutes: [
        "/", 
        "/chats", 
        "/explore", 
        "/profile",
        "/chat/:botId" // This is a dynamic route, will be expanded in the sitemap
      ],
      exclude: ["/404"]
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
