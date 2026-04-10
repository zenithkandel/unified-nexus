import re
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
for i, script in enumerate(scripts):
    with open(f'script_{i}.js', 'w', encoding='utf-8') as f:
        f.write(script)
