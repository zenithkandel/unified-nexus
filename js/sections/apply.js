/**
 * apply.js
 * 
 * Front-end handler for the student join/apply form interactions, intercepting
 * form submits and triggering api-client requests.
 */
import { submitApplication } from '../api-client.js';
import { validateApplicationForm } from '../validators.js';

export function bindApplyForm(form, statusElement) {
    if (!form || !statusElement) {
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = {
            name: String(formData.get('name') || '').trim(),
            email: String(formData.get('email') || '').trim(),
            phone: String(formData.get('phone') || '').trim(),
            clubId: String(formData.get('clubId') || '').trim(),
            message: String(formData.get('message') || '').trim()
        };

        const errors = validateApplicationForm(payload);
        if (errors.length > 0) {
            setStatus(statusElement, errors[0], 'error');
            return;
        }

        setStatus(statusElement, 'Submitting your application...', '');
        try {
            await submitApplication(payload);
            form.reset();
            setStatus(statusElement, 'Application submitted successfully.', 'success');
        } catch (error) {
            setStatus(statusElement, error.message || 'Submission failed.', 'error');
        }
    });
}

function setStatus(target, message, kind) {
    target.textContent = message;
    target.classList.remove('success', 'error');
    if (kind) {
        target.classList.add(kind);
    }
}

