import { filtersConfig } from "../configs/filtersConfig.js";

export function filtersTemplate() {
    const filtersBody = document.createElement('div')
    filtersBody.classList.add('filters__body', 'hidden')
    filtersBody.id = 'filtersBody';
    let filtersHTML = `
            <div class="filter__group">
                <h3>Возраст</h3>
                    <div class="age__inputs">
                        <input type="number" id="ageMin" placeholder="От" min="0" max="100">
                        <input type="number" id="ageMax" placeholder="До" min="0" max="100">
                    </div>
            </div>
        `;

    Object.entries(filtersConfig).forEach(([filterKey, config]) => {
        filtersHTML += `
                <div class="filter__group">
                    <h3>${config.title}</h3>
                    <div class="filter__options">
                        ${Object.entries(config.options).map(([key, label]) => `
                            <div class="filter__option">
                                <input type="checkbox" id="${filterKey}-${key}" 
                                       data-filter="${filterKey}" data-value="${key}">
                                <label for="${filterKey}-${key}">${label}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
    });

    filtersHTML += `<button class="reset-filters" id="resetFilters">Сбросить фильтры</button>`;
    filtersBody.innerHTML = filtersHTML
    return filtersBody
}