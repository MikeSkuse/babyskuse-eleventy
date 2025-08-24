import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

export const onRequest = staticFormsPlugin({
  respondWith: ({ formData, name }) => {
    // Extract form data
    const name_field = formData.get("name");
    const email = formData.get("email");
    const attending = formData.get("attending");
    const guests = formData.get("guests");
    const dietary = formData.get("dietary");
    const message = formData.get("message");

    // Log the submission (you can replace this with KV storage, email, etc.)
    console.log(`RSVP Submission from ${name_field} (${email}):`, {
      attending,
      guests,
      dietary,
      message
    });

    // Return a success response
    return new Response(
      `Thank you ${name_field}! Your RSVP has been received. We'll see you at the celebration!`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
});
