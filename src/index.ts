// Security headers function
function getSecurityHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/html',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: https://maps.googleapis.com https://maps.gstatic.com https://*.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://maps.googleapis.com; media-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'autoplay=(), camera=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  };
}

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    
    console.log('Request:', url.pathname, request.method);
    console.log('Available env keys:', Object.keys(env));
    
    // Handle form submissions
    if (url.pathname === '/rsvp/' && request.method === 'POST') {
      return handleRSVPSubmission(request, env);
    }
    
    // Admin endpoint removed - no longer needed
    
    // Debug endpoint removed for security
    
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
        </ul>
      </body>
      </html>
    `, {
      status: 200,
      headers: getSecurityHeaders()
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
        headers: getSecurityHeaders()
      }
    );
  } catch (error) {
    console.error('Error storing RSVP in KV:', error);
    
    return new Response(
      `Sorry, there was an error saving your RSVP. Please try again or contact us directly.`,
      {
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}




















