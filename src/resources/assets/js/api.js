export async function postData(endpoint, formData) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    try {
        const response = await fetch(`/media-picker/${endpoint}`, {
            method: 'POST',
            body: formData,
            headers: { 'X-CSRF-TOKEN': csrfToken, 'Accept': 'application/json' }
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'An unknown error occurred.');
        return result;
    } catch (error) {
        alert(error.message);
        throw error;
    }
}