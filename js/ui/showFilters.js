document.getElementById('filtersToggle').addEventListener('click', () => {
    this.toggleFilters();
});



function toggleFilters() {
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersBody = document.getElementById('filtersBody');
    const isExpanded = filtersToggle.getAttribute('aria-expanded') === 'true';

    filtersToggle.setAttribute('aria-expanded', !isExpanded);

    if (isExpanded) {
        filtersBody.classList.add('hidden');

        setTimeout(() => {
            if (filtersBody.classList.contains('hidden')) {
                filtersBody.style.pointerEvents = 'none';
            }
        }, 400);
    } else {
        filtersBody.style.pointerEvents = 'all';
        filtersBody.classList.remove('hidden');
    }
}