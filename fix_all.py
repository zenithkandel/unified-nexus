
with open('css/app.css', 'r', encoding='utf-8') as f: css = f.read()
css = css.replace('z-index: 100 !important;', 'z-index: 0;', 2)
# But wait, what if z-index 100 was changed twice? I want to specifically target canvas container inside css
css = css.replace('''#canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    opacity: 1;
    transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}''', '''#canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    pointer-events: none;
    opacity: 1;
    transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}''')
css = css.replace('.container {\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 1.5rem;\n}', '.container {\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 1.5rem;\n    position: relative;\n    z-index: 10;\n}')
css = css.replace('.section {\n    padding: 6rem 0;\n}', '.section {\n    padding: 6rem 0;\n    position: relative;\n    z-index: 0;\n}')
with open('css/app.css', 'w', encoding='utf-8') as f: f.write(css)
