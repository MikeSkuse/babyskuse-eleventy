---
title: RSVP Admin
permalink: /admin-rsvp/index.html
description: 'Admin page to view RSVP submissions'
layout: page
---

# RSVP Submissions

This page shows all RSVP submissions stored in Cloudflare KV.

<div id="rsvp-list">
  <p>Loading RSVP submissions...</p>
</div>

<script>
async function loadRSVPs() {
  try {
            // This will be handled by a Cloudflare Function
        const response = await fetch('/api/rsvp');
    if (response.ok) {
      const rsvps = await response.json();
      displayRSVPs(rsvps);
    } else {
      document.getElementById('rsvp-list').innerHTML = '<p>Error loading RSVPs. Please check the console for details.</p>';
    }
  } catch (error) {
    console.error('Error loading RSVPs:', error);
    document.getElementById('rsvp-list').innerHTML = '<p>Error loading RSVPs. Please check the console for details.</p>';
  }
}

function displayRSVPs(rsvps) {
  const container = document.getElementById('rsvp-list');
  
  if (!rsvps || rsvps.length === 0) {
    container.innerHTML = '<p>No RSVP submissions found.</p>';
    return;
  }

  const html = `
    <div class="rsvp-summary">
      <h3>Summary</h3>
      <p><strong>Total Submissions:</strong> ${rsvps.length}</p>
      <p><strong>Attending:</strong> ${rsvps.filter(r => r.attending === 'yes').length}</p>
      <p><strong>Not Attending:</strong> ${rsvps.filter(r => r.attending === 'no').length}</p>
      <p><strong>Maybe:</strong> ${rsvps.filter(r => r.attending === 'maybe').length}</p>
    </div>
    
    <div class="rsvp-details">
      <h3>All Submissions</h3>
      ${rsvps.map(rsvp => `
        <div class="rsvp-item">
          <h4>${rsvp.name} (${rsvp.email})</h4>
          <p><strong>Status:</strong> ${rsvp.attending}</p>
          <p><strong>Guests:</strong> ${rsvp.guests}</p>
          ${rsvp.dietary ? `<p><strong>Dietary:</strong> ${rsvp.dietary}</p>` : ''}
          ${rsvp.message ? `<p><strong>Message:</strong> ${rsvp.message}</p>` : ''}
          <p><strong>Submitted:</strong> ${new Date(rsvp.timestamp).toLocaleString()}</p>
        </div>
      `).join('')}
    </div>
  `;
  
  container.innerHTML = html;
}

// Load RSVPs when page loads
document.addEventListener('DOMContentLoaded', loadRSVPs);
</script>

<style>
.rsvp-summary {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
}

.rsvp-details {
  margin-top: 2rem;
}

.rsvp-item {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  border-left: 4px solid var(--color-primary);
}

.rsvp-item h4 {
  margin-top: 0;
  color: var(--color-primary);
}

.rsvp-item p {
  margin: 0.5rem 0;
}
</style>
