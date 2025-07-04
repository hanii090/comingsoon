/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://foundify.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin/*',
    '/api/*',
    '/dashboard/*',
    '/plan/*',
    '/brand/*',
    '/deck/*'
  ],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/pricing'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/blog/top-5-startup-funding-mistakes'),
    await config.transform(config, '/blog/using-ai-to-create-business-plan'),
    await config.transform(config, '/terms'),
    await config.transform(config, '/privacy'),
    await config.transform(config, '/cookies'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
    ],
    additionalSitemaps: [
      'https://foundify.app/sitemap.xml',
    ],
  },
}