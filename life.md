---
layout: page
title: Life
subtitle: A small album of places, seasons, and ordinary days.
permalink: /life/
---

{% assign album = site.data.album.photos %}
{% if album and album.size > 0 %}
  <div class="album-grid">
    {% for photo in album %}
      <figure class="album-item">
        <div class="album-frame">
          <img
            src="{{ '/assets/album/' | append: photo.file | relative_url }}"
            alt="{{ photo.title }} ({{ photo.year }})"
            loading="lazy"
            {% if photo.focus %}style="object-position: {{ photo.focus }};"{% endif %}
          >
        </div>
        <figcaption>
          <div class="album-meta">
            <span class="album-title">{{ photo.title }}</span>
            <span class="album-year">{{ photo.year }}</span>
          </div>
          {% if photo.caption %}
            <p class="album-caption">{{ photo.caption }}</p>
          {% endif %}
        </figcaption>
      </figure>
    {% endfor %}
  </div>
{% else %}
  <p class="empty-note">Photos will appear here.</p>
{% endif %}
