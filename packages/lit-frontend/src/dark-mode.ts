window.addEventListener('load', () => {
    const isDarkMode = localStorage.getItem('dark');
    if (isDarkMode?.toString() === 'true') {
        document.body.classList.add('dark-mode'); // Apply dark mode class to body
    } else {
        document.body.classList.remove('dark-mode'); // Remove dark mode class from body
    }
});