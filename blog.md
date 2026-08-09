---
layout: page
title: Life
subtitle: Notes on research, papers, and related ideas.
permalink: /blog/
---

{% if site.posts.size > 0 %}
  <ul class="post-list post-list-full">
    {% for post in site.posts %}
      <li>
        <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%b %-d, %Y' }}</time>
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
