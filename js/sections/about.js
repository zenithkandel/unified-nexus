export function renderAbout(target) {
    if (!target) {
        return;
    }

    target.innerHTML = `
		<div class="about-grid">
			<div>
				<p>Unified Nexus is a vibrant student-led platform that celebrates creativity, expression, and collaboration. It brings together students from diverse interests to explore, refine, and showcase their talents in an inspiring environment.</p>
				<p>Whether you are into music, literature, dance, or social service, Unified Nexus welcomes all students to discover and develop their talents in a supportive environment where everyone thrives together.</p>
				<p><strong>Vision:</strong> To create a unified space where creativity thrives, individuality is respected, and students are inspired to make a meaningful impact, both personally and socially.</p>
				<ul class="pillar-list">
					<li>Leadership Skills and Confidence</li>
					<li>Communication and Public Speaking</li>
					<li>Teamwork and Decision-Making</li>
					<li>Creativity, Discipline, and Growth</li>
				</ul>
			</div>
			<div class="card">
				<h3>Why Join</h3>
				<p class="meta">Leadership, confidence, communication, teamwork, discipline, and critical thinking development.</p>
				<p class="meta">Open for all students.</p>
			</div>
		</div>
	`;
}

