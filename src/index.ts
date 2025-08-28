export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    
    console.log('Request:', url.pathname, request.method);
    console.log('Available env keys:', Object.keys(env));
    
    // Handle form submissions
    if (url.pathname === '/rsvp/' && request.method === 'POST') {
      return handleRSVPSubmission(request, env);
    }
    
    // Handle API requests for admin
    if (url.pathname === '/api/rsvps' && request.method === 'GET') {
      return handleRSVPList(env);
    }
    
    // Debug: Show available bindings
    if (url.pathname === '/debug') {
      return new Response(`
        <h1>Debug Info</h1>
        <p>Available env keys: ${Object.keys(env).join(', ')}</p>
        <p>ASSETS available: ${!!env.ASSETS}</p>
        <p>__STATIC_CONTENT available: ${!!env.__STATIC_CONTENT}</p>
        <p>__STATIC_CONTENT_MANIFEST available: ${!!env.__STATIC_CONTENT_MANIFEST}</p>
      `, { headers: { 'Content-Type': 'text/html' } });
    }
    
    // For now, return a simple response indicating the Worker is working
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Baby Skuse - Worker Test</title>
      </head>
      <body>
        <h1>Baby Skuse Worker is Working!</h1>
        <p>The Worker is deployed and responding correctly.</p>
        <p>Path: ${url.pathname}</p>
        <p>Method: ${request.method}</p>
        <hr>
        <p>Next steps:</p>
        <ul>
          <li>Add static site serving</li>
          <li>Test RSVP form at /rsvp/</li>
          <li>Test admin panel at /admin-rsvp/</li>
        </ul>
        <p><a href="/debug">Debug Info</a></p>
      </body>
      </html>
    `, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  },
};

async function handleRSVPSubmission(request: Request, env: any) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name_field = formData.get("name");
    const email = formData.get("email");
    const attending = formData.get("attending");
    const guests = formData.get("guests");
    const dietary = formData.get("dietary");
    const message = formData.get("message");

    // Create a unique ID for this submission
    const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create the submission object
    const submission = {
      id: submissionId,
      timestamp: new Date().toISOString(),
      name: name_field,
      email: email,
      attending: attending,
      guests: guests,
      dietary: dietary,
      message: message
    };

    // Store in KV
    await env.rsvp.put(submissionId, JSON.stringify(submission));
    
    // Return a success response
    return new Response(
      `Thank you ${name_field}! Your RSVP has been received and saved.`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    console.error('Error storing RSVP in KV:', error);
    
    return new Response(
      `Sorry, there was an error saving your RSVP. Please try again or contact us directly.`,
      {
        status: 500,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }
}

async function handleRSVPList(env: any) {
  try {
    // List all keys in the KV namespace
    const keys = await env.rsvp.list();
    
    // Get all RSVP submissions
    const rsvps: any[] = [];
    for (const key of keys.keys) {
      const value = await env.rsvp.get(key.name);
      if (value) {
        rsvps.push(JSON.parse(value));
      }
    }
    
    // Sort by timestamp (newest first)
    rsvps.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return new Response(JSON.stringify(rsvps), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error retrieving RSVPs:', error);
    
    return new Response(JSON.stringify({ error: 'Failed to retrieve RSVPs' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}


















