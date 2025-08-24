import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

export const onRequest = staticFormsPlugin({
  respondWith: async ({ formData, name, env }) => {
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

    try {
      // Store in KV
      await env.rsvp.put(submissionId, JSON.stringify(submission));
      
      // Log the submission
      console.log(`RSVP Submission stored in KV: ${submissionId}`, submission);

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
      
      // Return an error response
      return new Response(
        `Sorry ${name_field}, there was an error saving your RSVP. Please try again or contact us directly.`,
        {
          status: 500,
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
    }
  },
});
