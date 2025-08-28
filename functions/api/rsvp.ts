export async function onRequestPost({ request, env }: { request: Request; env: any }) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name_field = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
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
      phone: phone,
      attending: attending,
      guests: guests,
      dietary: dietary,
      message: message
    };

    // Store in KV
    await env.rsvp.put(submissionId, JSON.stringify(submission));
    
    // Return a success response
    return new Response(
      `Thank you ${name_field}! Your RSVP has been received and saved. We'll see you at the celebration!`,
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

export async function onRequestGet({ env }: { env: any }) {
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
