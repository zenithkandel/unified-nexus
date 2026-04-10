export function renderAbout(target) {
	if (!target) {
		return;
	}

	target.innerHTML = `
		<div class="about-story">
			<div class="about-chapter" data-reveal>
				<h3>Beginning</h3>
				<p>Unified Nexus emerged as a student response to silence between talent and opportunity. We created one platform where arts, ideas, and social purpose can meet in real time.</p>
			</div>
			<div class="about-chapter" data-reveal data-reveal-delay="1">
				<h3>Middle</h3>
				<p>From literature to performance to service, our chapters are designed to turn participants into contributors. Students are not spectators here; they build the stage.</p>
			</div>
			<div class="about-keys" data-reveal data-reveal-delay="2">
				<div class="about-key"><strong>Leadership and Confidence</strong><span>Outcome</span></div>
				<div class="about-key"><strong>Communication and Teamwork</strong><span>Outcome</span></div>
				<div class="about-key"><strong>Discipline and Creative Growth</strong><span>Outcome</span></div>
				<div class="about-key"><strong>Open to Every Student</strong><span>Access</span></div>
			</div>
		</div>
	`;
}

