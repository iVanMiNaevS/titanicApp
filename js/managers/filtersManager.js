import { filters } from "../configs/filtersConfig.js"
import { filtersTemplate } from "../templates/filtersTemplate.js"
import { PassengerManager } from "./passengerManager.js"

export class FiltersManager {
    constructor(passengerManager) {
        this.filters = {
            ...filters
        }
        this.passengerManager = passengerManager
        this.container = document.querySelector('.filters__sidebar')
        this.searchInput = document.getElementById('searchInput')
        this.searchForm = document.querySelector('.search__box')
    }

    async init() {
        this.renderFilters()
        this.searchForm.addEventListener('submit', (e) => { e.preventDefault() });
        this.searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter');
        });
    }

    renderFilters() {
        this.container.appendChild(filtersTemplate())
    }
}
