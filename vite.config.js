// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths"; // ✅ ADD THIS
// import path from "path";

// export default defineConfig({
//   plugins: [
//     react(),
//     tsconfigPaths(), // ✅ USE IT HERE
//   ],
//   server: {
//     proxy: {
//       "/api": "http://localhost:8000",
//     },
//   },
//   resolve: {
//     alias: {
//       "@components": path.resolve(__dirname, "src/components"),
//       "@pages": path.resolve(__dirname, "src/pages"),
//       "@features": path.resolve(__dirname, "src/features"),
//       "@api": path.resolve(__dirname, "src/features/api"),
//       "@utils": path.resolve(__dirname, "src/utils"),
//       "@routes": path.resolve(__dirname, "src/routes"),
//       "@hooks": path.resolve(__dirname, "src/hooks"),
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // ✅ USE IT HERE
  ],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  resolve: {
    alias: {
      // "@components": path.resolve(__dirname, "src/components"),
      // "@pages": path.resolve(__dirname, "src/pages"),
      // "@features": path.resolve(__dirname, "src/features"),
      // "@api": path.resolve(__dirname, "src/features/api"),
      // "@utils": path.resolve(__dirname, "src/utils"),
      // "@routes": path.resolve(__dirname, "src/routes"),
      // "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
