import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    // host: "0.0.0.0", // Make the server accessible externally
    port: 3000, // Custom port
    strictPort: true, // If true, the server will exit if the specified port is already in use
    open: false, // Open the browser automatically
  },
});
