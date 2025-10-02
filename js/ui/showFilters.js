document.getElementById('filtersToggle').addEventListener('click', () => {
    this.toggleFilters();
});



function toggleFilters() {
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersBody = document.getElementById('filtersBody');
    const isExpanded = filtersToggle.getAttribute('aria-expanded') === 'true';

    // Устанавливаем новое состояние
    filtersToggle.setAttribute('aria-expanded', !isExpanded);

    if (isExpanded) {
        // Закрываем фильтры
        // filtersBody.classList.remove('show');
        filtersBody.classList.add('hidden');

        // После завершения анимации скрываем pointer-events
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