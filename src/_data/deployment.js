// Debug: Log all environment variables to see what's available in Cloudflare
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('All process.env keys:', Object.keys(process.env));
console.log('CF_PAGES_DEPLOYMENT_ID:', process.env.CF_PAGES_DEPLOYMENT_ID);
console.log('CF_PAGES_COMMIT_SHA:', process.env.CF_PAGES_COMMIT_SHA);
console.log('CF_PAGES_BRANCH:', process.env.CF_PAGES_BRANCH);
console.log('CF_PAGES_ENVIRONMENT:', process.env.CF_PAGES_ENVIRONMENT);
console.log('GITHUB_SHA:', process.env.GITHUB_SHA);
console.log('GITHUB_REF_NAME:', process.env.GITHUB_REF_NAME);
console.log('ELEVENTY_ENV:', process.env.ELEVENTY_ENV);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('npm_package_version:', process.env.npm_package_version);
console.log('===================================');

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


