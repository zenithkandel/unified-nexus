import re
import os

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Make canvas a global container
canvas_str = '<div id="canvas-container"></div>'
if canvas_str in html:
    html = html.replace(canvas_str, '')
    html = html.replace('<body>', '<body>\n    <div id="canvas-container"></div>')

# Find the scroll listener
scroll_match = re.search(r'window\.addEventListener\("scroll", \(\) => \{\s*const nav = document\.getElementById\("navbar"\);\s*if \(window\.scrollY > 50\) \{\s*nav\.classList\.add\("scrolled"\);\s*\} else \{\s*nav\.classList\.remove\("scrolled"\);\s*\}\s*\}\);', html, re.DOTALL)
if scroll_match:
    old_scroll = scroll_match.group(0)
    new_scroll = """window.addEventListener("scroll", () => {
        const nav = document.getElementById("navbar");
        if (window.scrollY > 50) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
        
        const canvasContainer = document.getElementById("canvas-container");
        if (canvasContainer) {
          if (window.scrollY > window.innerHeight * 0.3) {
            canvasContainer.classList.add("scrolled-bg");
          } else {
            canvasContainer.classList.remove("scrolled-bg");
          }
        }
      });"""
    html = html.replace(old_scroll, new_scroll)
else:
    print("Could not match the scroll listener explicitly, won't replace scroll logic")


# Also to make it "less in density", we can actually hide half of the particles based on a class change!
# Wait, threejs canvas doesn't map CSS classes to JS geometries without custom logic.
# Opacity 0.15 is generally enough to make them less visible. Is that enough for "less density"?
# We can also add a logic in initThreeJS to scale particles if the class is present. But fading out is easier and looks good.

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

css_path = os.path.join('css', 'app.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Update #canvas-container css
old_canvas_css = """#canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}"""

new_canvas_css = """#canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    opacity: 1;
    transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1);
}

#canvas-container.scrolled-bg {
    opacity: 0.12; /* Less opacity and presence */
}"""

if old_canvas_css in css:
    css = css.replace(old_canvas_css, new_canvas_css)
else:
    print("Could not find old canvas css")
    
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
import re
with open('index.html', 'r', encoding='utf-8') as f: html = f.read()

# Move canvas to top
html = html.replace('<section class="hero" id="hero">\n      <div id="canvas-container"></div>', '<section class="hero" id="hero">')
html = html.replace('<body>', '<body>\n    <div id="canvas-container"></div>')

# Scroll
html = html.replace('if (window.scrollY > 50) {', '''if (window.scrollY > 50) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
        
        const canvasContainer = document.getElementById("canvas-container");
        if (canvasContainer) {
          if (window.scrollY > window.innerHeight * 0.3) {
            canvasContainer.classList.add("scrolled-bg");
            document.body.classList.add("canvas-scrolled");
          } else {
            canvasContainer.classList.remove("scrolled-bg");
            document.body.classList.remove("canvas-scrolled");
          }
        }
        
        // This stops double executing the original inside if''')
        
# Fix the double executing
html = re.sub(r'nav\.classList\.add\("scrolled"\);\n\s*\} else {\n\s*nav\.classList\.remove\("scrolled"\);\n\s*\}\s*const canvasContainer', 'const canvasContainer', html)

with open('index.html', 'w', encoding='utf-8') as f: f.write(html)
