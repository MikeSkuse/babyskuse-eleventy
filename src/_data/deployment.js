// Deployment information
// This can be populated during build time or accessed via environment variables
export default {
  version: process.env.npm_package_version || '4.3.3',
  buildTime: new Date().toISOString(),
  environment: process.env.ELEVENTY_ENV || 'development',
  // Use Cloudflare Pages environment variables
  deploymentId: process.env.CF_PAGES_DEPLOYMENT_ID || 'build-' + Date.now().toString(36),
  commitHash: process.env.CF_PAGES_COMMIT_SHA ? process.env.CF_PAGES_COMMIT_SHA.substring(0, 7) : 'local',
  branch: process.env.CF_PAGES_BRANCH || 'local'
};


