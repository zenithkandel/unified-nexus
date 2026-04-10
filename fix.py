import re
with open('css/app.css', 'r', encoding='utf-8') as f: css = f.read()

css = css.replace('''    width: 100vw;
    height: 100vh;
    z-index: 100 !important;
    pointer-events: none;''', '''    width: 100vw;
    height: 100vh;
    z-index: 1; /* Float over static backgrounds */
    pointer-events: none;''')

css = css.replace('''    inset: 0;
    background: linear-gradient(135deg, rgba(127, 43, 62, 0.05), transparent);
    z-index: 100 !important;
    pointer-events: none;''', '''    inset: 0;
    background: linear-gradient(135deg, rgba(127, 43, 62, 0.05), transparent);
    z-index: 0;
    pointer-events: none;''')

css = css.replace('.container {\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 1.5rem;\n}', '.container {\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 1.5rem;\n    position: relative;\n    z-index: 10; /* Float text over canvas */\n}')

with open('css/app.css', 'w', encoding='utf-8') as f: f.write(css)
