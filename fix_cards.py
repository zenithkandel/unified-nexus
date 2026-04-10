import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_html = """                <div class="club-card reveal">
                  <img src="${club.hero_image_path || "images/clubs/placeholder.jpg"}" alt="${club.name}" class="club-image" onerror="this.src='https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=600&q=80'" />
                  <div class="club-content">"""

new_html = """                <div class="club-card reveal">
                  <div class="club-image-wrapper">
                    <img src="${club.hero_image_path || "images/clubs/placeholder.jpg"}" alt="${club.name}" class="club-image" onerror="this.src='https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=600&q=80'" />
                    <div class="club-image-overlay"></div>
                  </div>
                  <div class="club-content">"""

html = html.replace(old_html, new_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)


with open(os.path.join('css', 'app.css'), 'r', encoding='utf-8') as f:
    css = f.read()

old_css = """.club-card {
    background: var(--c-716F75);
    border-radius: 4px;
    box-shadow: var(--shadow-subtle);
    border: 1px solid var(--c-959294);
    transition: transform var(--transition-base), box-shadow var(--transition-base);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.club-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-medium);
    border-color: var(--c-AAAAAA);
}

.club-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-bottom: 1px solid var(--c-959294);
    filter: grayscale(40%);
}

.club-content {
    padding: 2.5rem 2rem;
}"""

new_css = """.club-card {
    background: var(--c-57545B);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(127, 43, 62, 0.3);
    transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
}

.club-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(127, 43, 62, 0.05), transparent);
    z-index: 0;
    pointer-events: none;
}

.club-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(127, 43, 62, 0.3);
    border-color: var(--c-7F2B3E);
}

.club-image-wrapper {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    background-color: var(--c-661B28);
    border-bottom: 2px solid var(--c-7F2B3E);
}

.club-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    mix-blend-mode: luminosity;
    opacity: 0.85;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.club-card:hover .club-image {
    transform: scale(1.05);
}

.club-image-overlay {
    position: absolute;
    inset: 0;
    background-color: var(--c-7F2B3E);
    mix-blend-mode: multiply;
    opacity: 0.7;
    transition: opacity var(--transition-base);
}

.club-card:hover .club-image-overlay {
    opacity: 0.4;
}

.club-content {
    padding: 2.5rem 2rem;
    position: relative;
    z-index: 1;
}"""

if old_css in css:
    css = css.replace(old_css, new_css)
else:
    print("WARNING: Could not find exact CSS block to replace.")

with open(os.path.join('css', 'app.css'), 'w', encoding='utf-8') as f:
    f.write(css)
import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_html = '''                <div class="club-card reveal">
                  <img src="" alt="" class="club-image" onerror="this.src='https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=600&q=80'" />
                  <div class="club-content">'''

new_html = '''                <div class="club-card reveal">
                  <div class="club-image-wrapper">
                    <img src="" alt="" class="club-image" onerror="this.src='https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=600&q=80'" />
                    <div class="club-image-overlay"></div>
                  </div>
                  <div class="club-content">'''

# replace quotes properly manually just read and replace
