import { state } from './state.js';
import { fetchClubs, fetchExecutive } from './api-client.js';
import { initTheme, bindThemeToggle } from './theme.js';
import { hideLoader } from './loader.js';
import { initParticles } from './particles.js';
import { initRouter } from './router.js';
import { initHero } from './sections/hero.js';
import { renderAbout } from './sections/about.js';
import { renderClubs, populateClubSelect } from './sections/clubs.js';
import { renderExecutive } from './sections/executive.js';
import { bindApplyForm } from './sections/apply.js';

async function initApp() {
	state.theme = initTheme();
	bindThemeToggle((nextTheme) => {
		state.theme = nextTheme;
	});

	renderAbout(document.getElementById('aboutContent'));
	initHero();
	initRouter();
	initParticles();

	const form = document.getElementById('applyForm');
	const formStatus = document.getElementById('formStatus');
	bindApplyForm(form, formStatus);

	try {
		const [clubs, executive] = await Promise.all([fetchClubs(), fetchExecutive()]);
		state.clubs = clubs;
		state.executive = executive;

		renderClubs(document.getElementById('clubsGrid'), state.clubs);
		renderExecutive(document.getElementById('executiveGrid'), state.executive);
		populateClubSelect(document.getElementById('clubId'), state.clubs);
	} catch (error) {
		const clubsGrid = document.getElementById('clubsGrid');
		const executiveGrid = document.getElementById('executiveGrid');
		if (clubsGrid) {
			clubsGrid.innerHTML = '<p>Unable to load clubs at the moment.</p>';
		}
		if (executiveGrid) {
			executiveGrid.innerHTML = '<p>Unable to load executive data at the moment.</p>';
		}
	} finally {
		hideLoader();
	}
}

initApp();

