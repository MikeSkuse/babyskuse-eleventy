---
title: RSVP
permalink: /rsvp/index.html
description: 'RSVP for the Baby Skuse celebration'
layout: page
---

# RSVP for Baby Skuse Celebration

We'd love to have you attend our celebration of Baby Skuse, due in February 2026.

Please use the form below to let us know if you can make it!

<form data-static-form-name="rsvp" class="rsvp-form" id="rsvpForm">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="phone">Phone *</label>
    <input type="phone" id="phone" name="phone" required>
  </div>

  <div class="form-group">
    <label for="attending">Will you be attending? *</label>
    <select id="attending" name="attending" required>
      <option value="">Please select...</option>
      <option value="yes">Yes, I'll be there!</option>
      <option value="no">Sorry, I can't make it</option>
    </select>
  </div>

  <div class="form-group">
    <label for="guests">Number of guests (including yourself)</label>
    <input type="number" id="guests" name="guests" min="1" max="5" value="1">
  </div>

  <div class="form-group">
    <label for="dietary">Any dietary requirements?</label>
    <textarea id="dietary" name="dietary" rows="3" placeholder="e.g., vegetarian, gluten-free, allergies..."></textarea>
  </div>

  <button type="submit" class="submit-btn" id="submitBtn">Submit RSVP</button>
</form>

<div id="messageContainer" class="message-container" style="display: none;">
  <div id="messageContent" class="message-content"></div>
</div>

<style>
.rsvp-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

.submit-btn {
  background: var(--color-primary);
  color: var(--color-light);
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background: var(--color-primary-dark);
}

.submit-btn:active {
  transform: translateY(1px);
}

.message-container {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  text-align: center;
}

.message-content {
  font-size: 1.1rem;
  font-weight: 600;
}

.message-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('rsvpForm');
  const submitBtn = document.getElementById('submitBtn');
  const messageContainer = document.getElementById('messageContainer');
  const messageContent = document.getElementById('messageContent');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Hide any previous messages
    messageContainer.style.display = 'none';
    
    try {
      // Get form data
      const formData = new FormData(form);
      
      // Submit form using fetch
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.text();
      
      if (response.ok) {
        // Show success message
        showMessage(result, 'success');
        // Reset form
        form.reset();
      } else {
        // Show error message
        showMessage(result, 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showMessage('Sorry, there was an error submitting your RSVP. Please try again.', 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit RSVP';
    }
  });
  
  function showMessage(message, type) {
    messageContent.innerHTML = message;
    messageContainer.className = `message-container message-${type}`;
    messageContainer.style.display = 'block';
    
    // Scroll to message
    messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
</script>
