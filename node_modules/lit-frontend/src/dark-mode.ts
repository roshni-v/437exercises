// window.addEventListener('load', () => {
//     const isDarkMode = localStorage.getItem('dark');
//     if (isDarkMode?.toString() === 'true') {
//         document.body.classList.add('dark-mode'); // Apply dark mode class to body
//     } else {
//         document.body.classList.remove('dark-mode'); // Remove dark mode class from body
//     }
// });

window.addEventListener('load', () => {
    const isDarkMode = localStorage.getItem('dark');
    if (isDarkMode?.toString() === 'true') {
        document.querySelectorAll('body, header, toggle-switch, p, h1, h2, a').forEach(element => {
            element.classList.add('dark-mode');
        });
    } else {
        document.querySelectorAll('body, header, toggle-switch, p, h1, h2, a').forEach(element => {
            element.classList.remove('dark-mode');
        });
    }
});