import re, os

css_path = os.path.join('css', 'app.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

btn_css = '''
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--c-7F2B3E);
  color: #fff !important;
  border: 1px solid var(--c-7F2B3E);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn-primary:hover {
  background-color: var(--c-661B28);
  border-color: var(--c-661B28);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.btn-secondary {
  background-color: transparent;
  color: var(--c-AAAAAA) !important;
  border: 1px solid var(--c-959294);
}

.btn-secondary:hover {
  background-color: var(--c-959294);
  color: var(--c-57545B) !important;
  border-color: var(--c-959294);
  transform: translateY(-3px);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes floatUp {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slowFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.anim-slide-down { animation: slideDown 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.anim-float-up-1 { animation: floatUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s; opacity: 0; }
.anim-float-up-2 { animation: floatUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.4s; opacity: 0; }
.anim-float-up-3 { animation: floatUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.6s; opacity: 0; }
.anim-fade-in { animation: slowFadeIn 1s ease forwards; animation-delay: 0.8s; opacity: 0; }
'''

css = re.sub(r'\.donate-link\s*{[^}]*}\s*\.donate-link:hover\s*{[^}]*}', btn_css, css, flags=re.DOTALL)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Make sure we don't double-replace
if 'anim-slide-down' not in html:
    html = html.replace('<nav class="navbar"', '<nav class="navbar anim-slide-down"')
    html = html.replace('<span class="section-label" style="justify-content: center; color: var(--c-7F2B3E);">EST. 2026</span>', 
                        '<span class="section-label anim-float-up-1" style="justify-content: center; color: var(--c-7F2B3E);">EST. 2026</span>')
    html = html.replace('<h1 class="hero-title-large">', '<h1 class="hero-title-large anim-float-up-2">')
    html = html.replace('<p class="hero-subtitle">', '<p class="hero-subtitle anim-float-up-3">')
    html = html.replace('<div style="display: flex; gap: 1rem; justify-content: center;">', '<div class="anim-fade-in" style="display: flex; gap: 1rem; justify-content: center;">')

html = html.replace('class="nav-link donate-link"', 'class="btn btn-primary"')
html = html.replace('class="nav-link" style="padding: 0.5rem 1.5rem; border: 1px solid var(--c-959294); border-radius: 4px;"', 'class="btn btn-secondary"')

html = re.sub(r'<div class="form-group">\s*<label for="phone">Phone Number</label>\s*<input[^>]+>\s*</div>', '', html, flags=re.IGNORECASE)
html = re.sub(r'phone:\s*document\.getElementById\((["\'])phone\1\)\.value,\s*', '', html, flags=re.IGNORECASE)
html = re.sub(r'document\.getElementById\((["\'])phone\1\)\.value\s*=\s*["\'][^"\']*["\'];\s*', '', html, flags=re.IGNORECASE)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
