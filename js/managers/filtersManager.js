import { getDefaultFilters } from "../configs/filtersConfig.js"
import { filtersTemplate } from "../templates/filtersTemplate.js"
import { filterPassengers } from "../utils/filterPassanger.js"

export class FiltersManager {
    constructor(passengerManager) {
        this.filters = getDefaultFilters();
        this.passengerManager = passengerManager
        this.container = document.querySelector('.filters__sidebar')
        this.searchInput = document.getElementById('searchInput')
        this.searchForm = document.querySelector('.search__box')
    }

    async init() {
        this.renderFilters()

        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });
        this.searchInput.addEventListener('focusout', () => {
            this.handleSearch()
        })
        this.container.addEventListener('change', (event) => {
            this.handleFilterChange(event);
        });

        const resetButton = this.container.querySelector('#resetFilters');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    }

    handleSearch() {
        const searchValue = this.searchInput.value.trim().toLowerCase();
        this.filters.name = searchValue;
        this.applyAllFilters();
    }

    handleFilterChange(event) {
        const target = event.target;

        if (target.type === 'checkbox') {
            const filterType = target.dataset.filter;
            const filterValue = target.dataset.value;
            if (this.filters[filterType]) {
                this.filters[filterType][filterValue] = target.checked;
            }
        }

        this.applyAllFilters();
    }

    updateAgeFilters() {
        const ageMinInput = document.getElementById('ageMin');
        const ageMaxInput = document.getElementById('ageMax');

        this.filters.age.min = ageMinInput?.value || '';
        this.filters.age.max = ageMaxInput?.value || '';
    }

    applyAllFilters() {
        this.updateAgeFilters();

        const allPassengers = this.passengerManager.getAllPassengers();
        const filteredPassengers = this.applyFilters(allPassengers);

        if (this.hasActiveFilters()) {
            this.passengerManager.setFilteredDataSource(filteredPassengers);
        } else {
            this.passengerManager.setDefaultDataSource();
        }
    }

    applyFilters(passengers) {
        return filterPassengers(this.filters, passengers, this.hasAnyFilterSelected)
    }
    resetFilters() {
        this.filters = getDefaultFilters(true, this.searchInput.value)

        const checkboxes = this.container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        const ageInputs = this.container.querySelectorAll('input[type="number"]');
        ageInputs.forEach(input => {
            input.value = '';
        });

        this.applyAllFilters();
    }
    // вспомогательные функции //////////////////////////////////////////////////////////
    hasActiveFilters() {
        return this.filters.name ||
            this.hasAnyFilterSelected(this.filters.gender) ||
            this.hasAnyFilterSelected(this.filters.survived) ||
            this.hasAnyFilterSelected(this.filters.passengerClass) ||
            this.filters.age.min ||
            this.filters.age.max;
    }

    hasAnyFilterSelected(filterGroup) {
        return Object.values(filterGroup).some(value => value === true);
    }


    // функции рендера ///////////////////////////////////////////////////
    renderFilters() {
        this.container.appendChild(filtersTemplate());
    }
}