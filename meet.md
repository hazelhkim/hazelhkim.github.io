---
layout: page
title: Meet
subtitle: If you think my time is meaningful to you, please pick an open time below and tell me what you’d like to discuss.
permalink: /meet/
---

{% if site.data.meet.request_emails %}
  {% assign request_email = site.data.meet.request_emails | join: "," %}
{% else %}
  {% assign request_email = site.data.main_info.email_link | remove: "mailto:" %}
{% endif %}

{% if site.data.meet.intro and site.data.meet.intro != "" %}
  <p class="meet-blurb">{{ site.data.meet.intro }}</p>
{% endif %}

<div
  class="meet-app"
  data-meet-app
  data-email="{{ request_email }}"
  data-subject="{{ site.data.meet.request_subject | escape }}"
  data-timezone="{{ site.data.meet.timezone }}"
  data-timezone-label="{{ site.data.meet.timezone_label }}"
  data-slot-minutes="{{ site.data.meet.slot_minutes }}"
  data-horizon-days="{{ site.data.meet.horizon_days }}"
  data-buffer-hours="{{ site.data.meet.buffer_hours }}"
  data-google-busy-url="{{ site.data.meet.google_busy_url }}"
>
  <script type="application/json" data-meet-config>
    {
      "weeklyHours": {{ site.data.meet.weekly_hours | jsonify }},
      "blockedDates": {{ site.data.meet.blocked_dates | jsonify }}
    }
  </script>

  <p class="meet-sync" data-meet-sync>Checking Google Calendar…</p>

  <div class="meet-toolbar">
    <button type="button" class="meet-nav-btn" data-meet-prev aria-label="Previous week">←</button>
    <p class="meet-week-label" data-meet-week-label></p>
    <button type="button" class="meet-nav-btn" data-meet-next aria-label="Next week">→</button>
  </div>

  <div class="meet-grid" data-meet-grid></div>
  <p class="meet-empty" data-meet-empty hidden>No open slots in this week. Try the next week →</p>

  <form class="meet-form" data-meet-form>
    <p class="meet-selected" data-meet-selected>Select a time above to continue.</p>

    <label class="meet-field">
      <span>Your name</span>
      <input type="text" name="name" required autocomplete="name" placeholder="Name">
    </label>

    <label class="meet-field">
      <span>Your email</span>
      <input type="email" name="email" required autocomplete="email" placeholder="you@example.com">
    </label>

    <label class="meet-field">
      <span>What is this for?</span>
      <textarea name="note" required rows="3" maxlength="500" placeholder="A short note about the meeting (research chat, collaboration, question, …)"></textarea>
    </label>

    <input type="hidden" name="slot" data-meet-slot-input value="">

    <button type="submit" class="meet-cta" data-meet-submit disabled>Send request</button>
    <p class="meet-form-hint">This opens an email draft to me with your chosen time and note. Times shown in {{ site.data.meet.timezone_label }}.</p>
  </form>
</div>

<script src="{{ '/libs/custom/meet.js' | relative_url }}"></script>
