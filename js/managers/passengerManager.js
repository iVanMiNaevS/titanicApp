import { passengerTemplate } from "../templates/passengerTemplate.js";
import { hideLoadingIndicator, showLoadingIndicator } from "../utils/visibleLoading.js"

export class PassengerManager {
    constructor() {
        this.allPassengers = []
        this.currentDataSource = [];
        this.displayedPassengers = [];
        this.currentCountPassengers = 0;
        this.batchSize = 20;
        this.container = document.getElementById('passengerTable');
    }

    async init() {
        await this.fetchJsonPassengers()
        window.addEventListener('scroll', () => this.handleScroll());
    }

    async fetchJsonPassengers() {
        try {
            showLoadingIndicator(this.container);
            const res = await fetch('passengers.json');

            if (!res.ok) throw new Error(res.status + ' Ошибка загрузки пассажиров')

            this.allPassengers = await res.json();
            this.setDefaultDataSource();
            hideLoadingIndicator()
        } catch (error) {
            console.error('Ошибка загрузки пассажиров ' + error)
            this.container.innerHTML = '<div class="no-results">Ошибка загрузки данных пассажиров</div>';
        }
    }

    handleScroll() {

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 100 && this.canLoadMore()) {
            this.loadMorePassengers();
        }
    }

    loadMorePassengers() {
        if (!this.canLoadMore()) return;


        const startIndex = this.currentCountPassengers;
        const endIndex = Math.min(startIndex + this.batchSize, this.currentDataSource.length);

        const newPassengers = this.currentDataSource.slice(startIndex, endIndex);
        this.setDisplayedPassengers([...this.displayedPassengers, ...newPassengers], endIndex);

    }

    // Публичные функции для FiltersManager /////////////////////////////////////////////////////
    setFilteredDataSource(filteredPassengers) {
        this.currentDataSource = filteredPassengers;
        this.displayedPassengers = [];
        this.currentCountPassengers = 0;
        if (filteredPassengers.length === 0) {
            this.renderNoResults();
        } else {
            this.loadMorePassengers();
        }
    }

    setDefaultDataSource() {
        this.currentDataSource = this.allPassengers;
        this.displayedPassengers = [];
        this.currentCountPassengers = 0;
        this.loadMorePassengers();
    }


    // Вспомогательные функции /////////////////////////////////////////////////////////
    setDisplayedPassengers(passengers, endIndex) {
        this.displayedPassengers = passengers;
        this.currentCountPassengers = endIndex;
        this.renderPassengers();
    }

    canLoadMore() {
        return this.currentCountPassengers < this.currentDataSource.length;
    }
    getAllPassengers() {
        return this.allPassengers;
    }
    // Функции Рендера /////////////////////////////////////////////////////////////////////
    renderPassengers() {
        this.container.innerHTML = '';

        if (this.displayedPassengers.length !== 0) {
            const resultsCount = document.createElement('div');
            resultsCount.className = 'results__count';

            resultsCount.textContent = `Показано: ${this.displayedPassengers.length} из ${this.currentDataSource.length}`;

            this.container.appendChild(resultsCount);

            this.displayedPassengers.forEach(passenger => {
                this.renderPassenger(passenger)
            })

        } else {
            this.renderNoResults()
        }
    }
    renderNoResults() {
        this.container.innerHTML = '<div class="no-results">Пассажиры не найдены</div>'
    }
    renderPassenger(passenger) {
        this.container.appendChild(passengerTemplate(passenger))
    }
}