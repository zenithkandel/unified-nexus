import re
import os

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# We need to find the <script> block manually since there are multiple scripts in the header.
# The one at the end of the body contains the ThreeJS init.
import sys

last_script_idx = html.rfind('<script>')
end_script_idx = html.rfind('</script>')
if last_script_idx != -1 and end_script_idx != -1 and end_script_idx > last_script_idx:
    js_content = html[last_script_idx+8:end_script_idx].strip()
    full_script_tag = html[last_script_idx:end_script_idx+9]
    
    js_dest = os.path.join('js', 'app.js')
    
    # check what's inside app.js if it exists
    if os.path.exists(js_dest):
        with open(js_dest, 'r', encoding='utf-8') as f:
            existing = f.read()
            if len(existing.strip()) > 0 and 'initThreeJS' not in existing:
                js_dest = os.path.join('js', 'index-main.js')
                
    js_content = "/**\n * Unified Nexus Main JavaScript\n * Manages: \n * 1. Three.js Background Rendering\n * 2. Scroll Animations & Navbar state\n * 3. Dynamic Data Fetching (Clubs/Leadership)\n * 4. Application Form Submission\n * 5. Mobile Navigation Menu\n */\n\n" + js_content
    
    with open(js_dest, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    js_filename = os.path.basename(js_dest)
    html = html.replace(full_script_tag, f'    <script src="js/{js_filename}"></script>')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f"Extracted JS to {js_filename}")
else:
    print("Could not locate script")
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract script block
script_pattern = re.compile(r'<script>\s*/\* --- 1\. Three\.js Hero Geometry.*/\* --- Mobile Menu Logic --- \*/[^\n]*\n(.*?)</script>\s*</body>', re.DOTALL)
# Actually the ending might be dynamic, lets just use a broad approach
match = re.search(r'<script>((?:\s*//.*|\s*/\*.*|\s*function initThreeJS.*|.*)+?)</script>\s*</body>', html, re.DOTALL)