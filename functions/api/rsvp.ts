export async function onRequestPost({ request, env }: { request: Request; env: any }) {
  try {
    // Rate limiting - check IP address
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `rate_limit:${clientIP}`;
    
    // Check if IP is rate limited (max 5 submissions per hour)
    const rateLimitCount = await env.rsvp.get(rateLimitKey);
    if (rateLimitCount && parseInt(rateLimitCount) >= 5) {
      return new Response('Too many submissions. Please try again later.', { 
        status: 429,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    const formData = await request.formData();
    
    // Extract and validate form data
    const name_field = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const attending = formData.get("attending");
    const guests = formData.get("guests");
    const dietary = formData.get("dietary");
    const message = formData.get("message");

    // Input validation
    if (!name_field || typeof name_field !== 'string' || name_field.trim().length === 0) {
      return new Response('Name is required', { status: 400 });
    }

    if (!attending || typeof attending !== 'string' || !['yes', 'no'].includes(attending)) {
      return new Response('Valid attendance selection is required', { status: 400 });
    }

    // Sanitize inputs
    const sanitizedName = name_field.trim().substring(0, 100); // Limit length
    const sanitizedEmail = email && typeof email === 'string' ? email.trim().substring(0, 254) : '';
    const sanitizedPhone = phone && typeof phone === 'string' ? phone.trim().substring(0, 20) : '';
    const sanitizedGuests = guests && typeof guests === 'string' ? parseInt(guests) || 1 : 1;
    const sanitizedDietary = dietary && typeof dietary === 'string' ? dietary.trim().substring(0, 500) : '';
    const sanitizedMessage = message && typeof message === 'string' ? message.trim().substring(0, 1000) : '';

    // Validate email format if provided
    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return new Response('Invalid email format', { status: 400 });
    }

    // Validate guests number
    if (sanitizedGuests < 1 || sanitizedGuests > 10) {
      return new Response('Number of guests must be between 1 and 10', { status: 400 });
    }

    // Create a unique ID for this submission
    const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create the submission object with sanitized data
    const submission = {
      id: submissionId,
      timestamp: new Date().toISOString(),
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      attending: attending,
      guests: sanitizedGuests,
      dietary: sanitizedDietary,
      message: sanitizedMessage
    };

    // Store in KV
    await env.rsvp.put(submissionId, JSON.stringify(submission));
    
    // Update rate limit counter
    const currentCount = rateLimitCount ? parseInt(rateLimitCount) : 0;
    await env.rsvp.put(rateLimitKey, (currentCount + 1).toString(), { expirationTtl: 3600 }); // 1 hour
    
    // Return a success response
    return new Response(
      `Thank you ${sanitizedName}! Your RSVP has been received and saved.`,
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
