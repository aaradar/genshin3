import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/gneshi2/", // Replace 'your-repo-name' with your GitHub repository name
});
