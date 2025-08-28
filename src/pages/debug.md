---
title: Debug
permalink: /debug.html
description: 'Debug page to help development'
layout: page
---

# Debug Information

## Environment Variables

- **CF_PAGES_DEPLOYMENT_ID:** {{ process.env.CF_PAGES_DEPLOYMENT_ID | default('undefined') }}
- **CF_PAGES_COMMIT_SHA:** {{ process.env.CF_PAGES_COMMIT_SHA | default('undefined') }}
- **CF_PAGES_BRANCH:** {{ process.env.CF_PAGES_BRANCH | default('undefined') }}
- **CF_PAGES_ENVIRONMENT:** {{ process.env.CF_PAGES_ENVIRONMENT | default('undefined') }}
- **GITHUB_SHA:** {{ process.env.GITHUB_SHA | default('undefined') }}
- **GITHUB_REF_NAME:** {{ process.env.GITHUB_REF_NAME | default('undefined') }}
- **ELEVENTY_ENV:** {{ process.env.ELEVENTY_ENV | default('undefined') }}
- **NODE_ENV:** {{ process.env.NODE_ENV | default('undefined') }}
- **npm_package_version:** {{ process.env.npm_package_version | default('undefined') }}

## Deployment Data

- **version:** {{ deployment.version }}
- **buildTime:** {{ deployment.buildTime }}
- **environment:** {{ deployment.environment }}
- **deploymentId:** {{ deployment.deploymentId }}
- **commitHash:** {{ deployment.commitHash }}
- **branch:** {{ deployment.branch }}

## Raw Deployment Object

```json
{{ deployment | dump }}
```

## Footer Test

The footer should show: `{% if deployment.commitHash != 'local' %}{{ deployment.commitHash }}{% else %}local{% endif %} | {{ deployment.buildTime | formatDate('YYYY-MM-DD HH:mm') }}`

**Result:** `{% if deployment.commitHash != 'local' %}{{ deployment.commitHash }}{% else %}local{% endif %} | {{ deployment.buildTime | formatDate('YYYY-MM-DD HH:mm') }}`