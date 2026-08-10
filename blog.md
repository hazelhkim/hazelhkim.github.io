---
layout: page
title: Note
subtitle: Notes on research, papers, and related ideas.
permalink: /blog/
---

{% if site.posts.size > 0 %}
  <ul class="post-list post-list-full">
    {% for post in site.posts %}
      <li>
        <div class="post-list-tags">
          {% if post.tags and post.tags.size > 0 %}
            {% for tag in post.tags %}
              <span class="post-list-tag">{{ tag }}</span>
            {% endfor %}
          {% else %}
            <span class="post-list-tag post-list-tag-muted">note</span>
          {% endif %}
        </div>
        <div>
          <a class="post-list-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          {% if post.excerpt %}
            <p class="post-list-excerpt">{{ post.excerpt | strip_html | truncate: 180 }}</p>
          {% endif %}
        </div>
      </li>
    {% endfor %}
  </ul>
{% else %}
  <p class="empty-note">No posts yet.</p>
{% endif %}
