/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://winsam.xyz",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/admin/*", "/write"],
  changefreq: "monthly",
  priority: 0.7,
  robotsTxtOptions: {
    additionalSitemaps: ["https://winsam.xyz/blog-sitemap.xml"],
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/write"] },
      { userAgent: "Yeti", allow: "/", disallow: ["/admin/", "/write"] },
    ],
  },
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === "/blog" ? "weekly" : config.changefreq,
    priority: path === "/" ? 1 : path === "/blog" ? 0.8 : config.priority,
  }),
};
