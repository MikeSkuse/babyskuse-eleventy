---
layout: base
permalink: /index.html
title: 'Baby Skuse'
description: 'A Baby Skuse Celebration.'
discover:
  title: 'Baby Skuse Celebration'
  description: 'Join us for a special celebration with fun activities, games and party foods on November 1st, 2025'
---

<div class="wrapper">
  <header class="full | section" style="--spot-color: var(--color-primary)">
    <div class="section__inner flow region">
      <h1 class="text-center" style="color: var(--color-light);">A Baby Skuse Celebration</h1>
    </div>
    {% svg "divider/waves", null, "divider" %}
  </header>
  <article class="full | region">
    <div class="wrapper flow prose">
      <h2 id="title">You're invited!</h2>
      <p>We'd love to have you attend our celebration of Baby Skuse! (due in Feb 2026)</p>
      <p>Please <a href="#rsvp">RSVP here👇</a> to let us know if you can make it!</p>
      <p>
        <strong>📅 Date:</strong> 1st November 2025 </br>
        <strong>🕐 Time:</strong> 4:00 PM - 7:30 PM </br>
        <strong>📍 Where:</strong> <a href="https://maps.app.goo.gl/Hru23P6kad21dQ1NA" target="_blank" rel="noopener">Royal Wootton Bassett Memorial Hall</a> (Ample free parking!🅿️)</br>
        <strong>🥪 Food:</strong> Party Foods & Drinks / Cold Buffet and Cake 🍰 </br>
        <strong>👨‍👩‍👧‍👦 Who:</strong> Partners and Children also invited </br>
        <strong>🎲 Games:</strong> Baby Bingo, Baby Trivia, The Price is Right, What's in the box</br>
        <strong>📃 Activities:</strong> Wordsearch, Word Scramble, Baby Predictions, Advice & Wishes </br>
      </p>
    </div>
  </article>

  <article class="full | region">
    <div class="wrapper flow prose">
      <h2 id="rsvp"><a href="#rsvp" class="heading-anchor">RSVP</a></h2>
      <form data-static-form-name="rsvp" class="rsvp-form" id="rsvpForm">
  <div class="form-group">
    <label for="name">Full Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email
    </label>
    <input type="email" id="email" name="email">
  </div>

  <div class="form-group">
    <label for="phone">Phone</label>
    <input type="phone" id="phone" name="phone">
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
    <input type="number" id="guests" name="guests" min="1" max="10" value="1">
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
    border: 2px solid #d1d5db;
    border-radius: var(--border-radius);
    background: var(--color-bg);
    color: var(--color-text);
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
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
    background: var(--color-secondary);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

  /* Reduce space between main title and "You're invited!" section */
  .full.region:first-of-type {
    margin-top: -3rem;
  }

  .full.region:first-of-type h2 {
    margin-top: 0;
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

    </div>

 <article class="full | region">
    <div class="wrapper flow prose">
      <h2 id="gifts"><a href="#gifts" class="heading-anchor">Gifts</a></h2>
<p>
  Your presence is the greatest gift we could ask for! We do not expect any gifts — just come and celebrate with us and have fun.
</p>
<p>
  However, if you would still like to give something, we would appreciate any of the following:
</p>
<ul>
  <li>Books</li>
  <li>Nappies</li>
  <li>Baby grows: 3-6, 6-9 Months</li>
  <li>Water Wipes brand (Due to allergies)</li>
  <li>Aveeno Baby Products (No lavender)</li>
  <li>Muslin Squares</li>
  <li>Bibs / Dribble Bibs</li>
  <li>Baby toys</li>
</ul>
<p>⚠️ Please avoid products with Lavender or Aloe Vera due to allergies</p>
 </article>
</div>
