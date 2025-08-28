// Deployment information
// This can be populated during build time or accessed via environment variables
export const deployment = {
  version: process.env.npm_package_version || '4.3.3',
  buildTime: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'development',
  // These will be populated by Cloudflare Pages during deployment
  deploymentId: process.env.CF_PAGES_DEPLOYMENT_ID || 'local',
  commitHash: process.env.CF_PAGES_COMMIT_SHA || 'local',
  branch: process.env.CF_PAGES_BRANCH || 'local'
};
