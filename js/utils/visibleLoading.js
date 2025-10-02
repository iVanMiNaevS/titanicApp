export function showLoadingIndicator(container) {
    hideLoadingIndicator(container);
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.textContent = 'Загрузка...';
    loadingElement.id = 'loadingIndicator';
    container.appendChild(loadingElement);
}

export function hideLoadingIndicator() {
    const loadingElement = document.getElementById('loadingIndicator');
    if (loadingElement) loadingElement.remove();
}