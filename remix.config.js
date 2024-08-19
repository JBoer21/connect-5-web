/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverBuildTarget: "netlify",
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  tailwind: true,
  postcss: true,
};
