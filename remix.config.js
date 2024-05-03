/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    /^remix-utils.*/,
    // If you installed is-ip optional dependency you will need these too
    "is-ip",
    "ip-regex",
    "super-regex",
    "clone-regexp",
    "function-timeout",
    "time-span",
    "convert-hrtime",
    "is-regexp",
  ],
};
