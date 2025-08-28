// Deployment information
// This can be populated during build time or accessed via environment variables
export const deployment = {
  version: process.env.npm_package_version || '4.3.3',
  buildTime: new Date().toISOString(),
  environment: process.env.ELEVENTY_ENV || 'development',
  // For now, we'll use a simpler approach that works reliably
  deploymentId: 'build-' + Date.now().toString(36),
  commitHash: process.env.GITHUB_SHA ? process.env.GITHUB_SHA.substring(0, 7) : 'local',
  branch: process.env.GITHUB_REF_NAME || 'local'
};


