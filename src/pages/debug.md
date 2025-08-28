---
title: Debug
permalink: /debug.html
description: 'Debug page to help development'
layout: page
---

# Debug Information

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

The footer should show: `{{ deployment.commitHash }} | {{ deployment.buildTime | formatDate('YYYY-MM-DD HH:mm') }}`

**Result:** `{{ deployment.commitHash }} | {{ deployment.buildTime | formatDate('YYYY-MM-DD HH:mm') }}`

## Expected Footer Output

Based on the deployment data above, the footer should display:
**"Baby Skuse {{ deployment.commitHash }} | {{ deployment.buildTime | formatDate('YYYY-MM-DD HH:mm') }}"**