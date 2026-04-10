export function validateApplicationForm(payload) {
    const errors = [];

    if (!payload.name || payload.name.trim().length === 0) {
        errors.push('Name is required.');
    }
    if (!payload.email || payload.email.trim().length === 0) {
        errors.push('Email is required.');
    }
    if (payload.email && !/^\S+@\S+\.\S+$/.test(payload.email)) {
        errors.push('Email format is invalid.');
    }
    if (!payload.clubId) {
        errors.push('Please select a club.');
    }
    if (!payload.message || payload.message.trim().length === 0) {
        errors.push('Message is required.');
    }

    if ((payload.name || '').length > 120) {
        errors.push('Name is too long.');
    }
    if ((payload.email || '').length > 150) {
        errors.push('Email is too long.');
    }
    if ((payload.phone || '').length > 30) {
        errors.push('Phone is too long.');
    }
    if ((payload.message || '').length > 1500) {
        errors.push('Message is too long.');
    }

    return errors;
}

