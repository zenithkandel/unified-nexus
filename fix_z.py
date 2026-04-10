
with open('css/app.css', 'r', encoding='utf-8') as f: css = f.read()
css = css.replace('z-index: 0;', 'z-index: 100 !important;')
with open('css/app.css', 'w', encoding='utf-8') as f: f.write(css)

