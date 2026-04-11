<?php
$content = file_get_contents(__DIR__ . '/admin/index.html');

// 1. Install Fonts & SortableJS
$content = str_replace(
    '<link rel="stylesheet" href="../css/variables.css" />', 
    '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />' . "\n" . '    <link rel="stylesheet" href="../css/variables.css" />', 
    $content
);

$content = str_replace(
    '<script src="https://zenithkandel.com.np/fontawesome/zenith-icons.js"></script>', 
    '<script src="https://zenithkandel.com.np/fontawesome/zenith-icons.js"></script>' . "\n" . '    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>', 
    $content
);

$content = str_replace(
    '--card-bg: var(--surface-panel);', 
    '--card-bg: var(--surface-panel);' . "\n" . '        --font-body: \'Plus Jakarta Sans\', sans-serif;' . "\n" . '        --font-heading: \'Plus Jakarta Sans\', sans-serif;', 
    $content
);

// 2. Replace Icons (fa-duotone and fa-solid to fa-sharp fa-solid)
// First temporarily change all fa-sharp to prevent doubling
$content = str_replace('fa-sharp fa-solid', 'fa-solid', $content);
$content = preg_replace('/fa-duotone\s+fa-([a-zA-Z0-9-]+)/', 'fa-sharp fa-solid fa-$1', $content);
$content = preg_replace('/fa-solid\s+fa-([a-zA-Z0-9-]+)/', 'fa-sharp fa-solid fa-$1', $content);

// 3. Rename Apps to Applications
$content = str_replace('<span>Apps</span>', '<span>Applications</span>', $content);

// 4. Update the View Apps Modal HTML
$viewModal = <<<HTML
    <!-- View Application Modal -->
    <div class="modal-overlay" id="appModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>View Application</h3>
          <button class="close-btn" onclick="closeModal('appModal')">
            <i class="fa-sharp fa-solid fa-xmark"></i>
          </button>
        </div>
        <div id="appModalContent" style="line-height: 1.6; font-size: 0.95rem;">
        </div>
      </div>
    </div>

    <!-- Modals -->
HTML;
$content = str_replace('<!-- Modals -->', $viewModal, $content);

// 5. Update Delete button to include View button
$oldAppsBtns = <<<HTML
                <div class="card-actions">
                  <button class="btn btn-danger" onclick="deleteApp(\${a.id})"><i class="fa-sharp fa-solid fa-trash-can"></i> Delete App</button>
                </div>
HTML;
$newAppsBtns = <<<HTML
                <div class="card-actions">
                  <button class="btn btn-primary" onclick="viewApp(\${a.id})"><i class="fa-sharp fa-solid fa-eye"></i> View</button>
                  <button class="btn btn-danger" onclick="deleteApp(\${a.id})"><i class="fa-sharp fa-solid fa-trash-can"></i> Delete App</button>
                </div>
HTML;
$content = str_replace($oldAppsBtns, $newAppsBtns, $content);


// 6. Escape Key Listener
$escListener = <<<JAVASCRIPT
      // Escape key to close modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.modal-overlay.active').forEach(m => window.closeModal(m.id));
        }
      });

      // Make label adapt
JAVASCRIPT;
$content = str_replace('// Make label adapt', $escListener, $content);


// 7. Inject activeApps and Drag-and-drop Logic
$content = str_replace('let activeExecs = [];', "let activeExecs = [];\n      let activeApps = [];", $content);

// We need to match loadApps
$content = preg_replace('/const apps = await adminFetch\("api\/admin\/applications-list\.php"\);\s+const grid = document.getElementById\("appsGrid"\);/s', "const apps = await adminFetch(\"api/admin/applications-list.php\");\n        activeApps = apps;\n        const grid = document.getElementById(\"appsGrid\");", $content);


$viewAppFn = <<<JS
      window.viewApp = (id) => {
        const a = activeApps.find(x => x.id == id);
        if (!a) return;
        document.getElementById("appModalContent").innerHTML = `
          <p><strong>Applicant Name:</strong> \${a.applicant_name}</p>
          <p><strong>Email:</strong> \${a.contact_email}</p>
          <p><strong>Phone:</strong> \${a.contact_phone || "N/A"}</p>
          <p><strong>Portfolio URL:</strong> <a href="\${a.portfolio_url}" target="_blank">\${a.portfolio_url || "None"}</a></p>
          <p><strong>Selected Club ID:</strong> \${a.selected_club_id}</p>
          <hr style="border:0; border-top:1px solid var(--line-soft); margin: 1.5rem 0;" />
          <p><strong>Message:</strong><br/> \${(a.message || "").replace(/\\n/g, "<br>")}</p>
        `;
        openModal("appModal");
      };

      window.deleteApp
JS;
$content = str_replace('window.deleteApp', $viewAppFn, $content);


$sortableScript = <<<JS
      // Exec Reordering SortableJS
      let execSortable = null;
      async function setupExecSortable() {
        if (!window.Sortable) return;
        const grid = document.getElementById("execGrid");
        if (execSortable) execSortable.destroy();
        execSortable = Sortable.create(grid, {
          animation: 150,
          ghostClass: "sortable-ghost",
          onEnd: async function () {
            const itemIds = Array.from(grid.children).map(c => c.dataset.id).filter(id => id);
            try {
              await adminFetch("api/admin/executive-reorder.php", "POST", { order: itemIds });
              loadExecs();
            } catch (e) {
              console.error("Reorder failed", e);
              loadExecs();
            }
          }
        });
      }

      // Navigation Logic
JS;
$content = str_replace('// Navigation Logic', $sortableScript, $content);

$content = str_replace('<div class="card">
              ${ImagePreview(e.photo_path)}', '<div class="card" data-id="${e.id}" style="cursor: grab;">
              ${ImagePreview(e.photo_path)}', $content);


$content = preg_replace('/if \(!execs\.length\) grid\.innerHTML = "<p>No executives found\.<\/p>";\s*\}/s', "if (!execs.length) grid.innerHTML = \"<p>No executives found.</p>\";\n        setupExecSortable();\n      }", $content);


// Hide input for Order in exec modal
$content = preg_replace('/<div class="form-group">\s*<label>Display Order<\/label>\s*<input\s*type="number"\s*id="execOrder"\s*name="display_order"\s*value="0"\s*required\s*\/>\s*<\/div>/s', '<input type="hidden" id="execOrder" name="display_order" value="0" />', $content);

file_put_contents(__DIR__ . '/admin/index.html', $content);
echo "Script complete";