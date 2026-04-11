<?php
$content = file_get_contents(__DIR__ . '/admin/index.html');

// Fonts
$content = str_replace('<link rel="stylesheet"', '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />' . "\n" . '    <link rel="stylesheet"', $content);
$content = str_replace('--card-bg: var(--surface-panel);', '--card-bg: var(--surface-panel);' . "\n" . '        --font-body: \'Plus Jakarta Sans\', sans-serif;' . "\n" . '        --font-heading: \'Plus Jakarta Sans\', sans-serif;', $content);


// Replace fa-duotone with fa-sharp fa-solid
$content = preg_replace('/fa-duotone\s+fa-([a-zA-Z-]+)/', 'fa-sharp fa-solid fa-$1', $content);
$content = preg_replace('/class="fa-solid\s+fa-([a-zA-Z-]+)"/', 'class="fa-sharp fa-solid fa-$1"', $content);

// Replace "Apps" text
$content = str_replace('<span>Apps</span>', '<span>Applications</span>', $content);

// Add Esc key listener
$escListener = <<<EOT
      // Escape key to close modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.modal-overlay.active').forEach(m => window.closeModal(m.id));
        }
      });

      // Make label adapt
EOT;
$content = str_replace('// Make label adapt', $escListener, $content);

// Add View Modal HTML 
$viewModal = <<<EOT
    <!-- View Application Modal -->
    <div class="modal-overlay" id="appModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>View Application</h3>
          <button class="close-btn" onclick="closeModal('appModal')">
            <i class="fa-sharp fa-solid fa-xmark"></i>
          </button>
        </div>
        <div id="appModalContent" style="line-height: 1.6;">
        </div>
      </div>
    </div>

    <!-- Modals -->
EOT;
$content = str_replace('<!-- Modals -->', $viewModal, $content);

// Update loadApps function with View button
$oldAppsLoad = <<<EOT
                <div class="card-actions">
                  <button class="btn btn-danger" onclick="deleteApp(\${a.id})"><i class="fa-sharp fa-solid fa-trash-can"></i> Delete App</button>
                </div>
EOT;
$newAppsLoad = <<<EOT
                <div class="card-actions">
                  <button class="btn btn-primary" onclick="viewApp(\${a.id})"><i class="fa-sharp fa-solid fa-eye"></i> View</button>
                  <button class="btn btn-danger" onclick="deleteApp(\${a.id})"><i class="fa-sharp fa-solid fa-trash-can"></i> Delete App</button>
                </div>
EOT;
$content = str_replace($oldAppsLoad, $newAppsLoad, $content);

// Add activeApps array
$content = str_replace('let activeExecs = [];', "let activeExecs = [];\n      let activeApps = [];", $content);

// Update loadApps to set activeApps
$content = preg_replace('/const apps = await adminFetch\("api\/admin\/applications-list\.php"\);\s+const grid = document.getElementById\("appsGrid"\);/s', "const apps = await adminFetch(\"api/admin/applications-list.php\");\n        activeApps = apps;\n        const grid = document.getElementById(\"appsGrid\");", $content);

// Add viewApp function 
$viewAppFn = <<<EOT
      window.viewApp = (id) => {
        const a = activeApps.find(x => x.id == id);
        if (!a) return;
        document.getElementById("appModalContent").innerHTML = `
          <p><strong>Applicant Name:</strong> \${a.applicant_name}</p>
          <p><strong>Email:</strong> \${a.contact_email}</p>
          <p><strong>Phone:</strong> \${a.contact_phone || "N/A"}</p>
          <p><strong>Portfolio URL:</strong> <a href="\${a.portfolio_url}" target="_blank">\${a.portfolio_url || "None"}</a></p>
          <p><strong>Message:</strong><br/> \${(a.message || "").replace(/\\n/g, "<br>")}</p>
        `;
        openModal("appModal");
      };

      window.deleteApp
EOT;
$content = str_replace('window.deleteApp', $viewAppFn, $content);

// Enable drag and drop reordering for Exec Grid
$sortableScript = <<<EOT
      // Exec Reordering SortableJS
      let execSortable = null;
      async function setupExecSortable() {
        if (!window.Sortable) return;
        const grid = document.getElementById("execGrid");
        if (execSortable) execSortable.destroy();
        execSortable = Sortable.create(grid, {
          animation: 150,
          onEnd: async function () {
            const itemIds = Array.from(grid.children).map(c => c.dataset.id).filter(id => id);
            try {
              await adminFetch("api/admin/executive-reorder.php", "POST", { order: itemIds });
            } catch (e) {
              console.error("Reorder failed", e);
            }
          }
        });
      }

      // Navigation Logic
EOT;
$content = str_replace('// Navigation Logic', $sortableScript, $content);

// Modify loadExecs to add data-id
$content = str_replace('<div class="card">
              ${ImagePreview(e.photo_path)}', '<div class="card" data-id="${e.id}" style="cursor: grab;">
              ${ImagePreview(e.photo_path)}', $content);

$content = str_replace('if (!execs.length) grid.innerHTML = "<p>No executives found.</p>";' . "\n" . '      }', "if (!execs.length) grid.innerHTML = \"<p>No executives found.</p>\";\n        setupExecSortable();\n      }", $content);

file_put_contents(__DIR__ . '/admin/index.html', $content);
echo "Done";