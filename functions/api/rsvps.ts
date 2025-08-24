export async function onRequest({ env }: { env: any }) {
  try {
    // List all keys in the KV namespace
    const keys = await env.rsvp.list();
    
    // Get all RSVP submissions
    const rsvps = [];
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
