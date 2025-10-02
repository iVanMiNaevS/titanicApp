import { passengerTemplate } from "../templates/passengareTemplate.js";
import { hideLoadingIndicator, showLoadingIndicator } from "../utils/visibleLoading.js"

export class PassengerManager {
    constructor() {
        this.passengers = []
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

            const passengers = await res.json();
            this.passengers = passengers;

            this.loadMorePassengers();

            hideLoadingIndicator()
        } catch (error) {
            console.error('Ошибка загрузки пассажиров ' + error)
            this.container.innerHTML = '<div class="no-results">Ошибка загрузки данных пассажиров</div>';
        }
    }

    handleScroll() {
        if (this.isLoading) return;

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
        const endIndex = Math.min(startIndex + this.batchSize, this.passengers.length);

        const newPassengers = this.passengers.slice(startIndex, endIndex);

        this.setDisplayedPassengers(newPassengers, endIndex)

    }

    // Вспомогательные функции /////////////////////////////////////////////////////////////////////
    showAllPassengers() {
        this.displayedPassengers = [...this.passengers];
        this.currentCountPassengers = this.passengers.length;
        this.renderPassengers();
    }

    setDisplayedPassengers(newPassengers, endIndex) {
        this.displayedPassengers = [...this.displayedPassengers, ...newPassengers];
        this.currentCountPassengers = endIndex;
        this.renderPassengers();
    }

    canLoadMore() {
        return this.currentCountPassengers < this.passengers.length;
    }

    // Функции Рендера ////////////////////////////////////////////////////////////////////////////
    renderPassengers() {
        this.container.innerHTML = '';
        console.log(this.displayedPassengers)
        if (this.displayedPassengers.length !== 0) {
            const resultsCount = document.createElement('div');
            resultsCount.className = 'results__count';
            resultsCount.textContent = `Показано: ${this.displayedPassengers.length} из ${this.passengers.length}`;
            this.container.appendChild(resultsCount);

            this.displayedPassengers.forEach(passenger => {
                this.renderPassenger(passenger)
            })

        } else {
            this.container.innerHTML = '<div class="no-results">Пассажиры не найдены</div>'
        }
    }

    renderPassenger(passenger) {
        const passengerLi = document.createElement('li')
        passengerLi.innerHTML = passengerTemplate(passenger)
        this.container.appendChild(passengerLi)
    }
}