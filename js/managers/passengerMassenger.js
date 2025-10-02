import { passengerTemplate } from "../templates/passengareTemplate.js";
import { hideLoadingIndicator, showLoadingIndicator } from "../utils/visibleLoading.js"

export class PassengerManager {
    constructor() {
        this.passengers = []
        this.container = document.getElementById('passengerTable');
    }

    async fetchJsonPassengers() {
        try {
            showLoadingIndicator(this.container);
            const res = await fetch('passengers.json');

            if (!res.ok) throw new Error(res.status + ' Ошибка загрузки пассажиров')

            const passengers = await res.json();
            this.passengers = passengers;
            hideLoadingIndicator()
        } catch (error) {
            console.error('Ошибка загрузки пассажиров ' + error)
            this.container.innerHTML = '<div class="no-results">Ошибка загрузки данных пассажиров</div>';
        }
    }

    showAllPassengers() {
        this.renderPassengers()
    }

    renderPassengers() {
        this.container.innerHTML = '';

        if (this.passengers.length !== 0) {
            const resultsCount = document.createElement('div');
            resultsCount.className = 'results__count';
            resultsCount.textContent = `Найдено пассажиров: ${this.passengers.length}`;
            this.container.appendChild(resultsCount);
            this.renderPassenger()

        } else {
            this.container.innerHTML = '<div class="no-results">Пассажиры не найдены</div>'
        }
    }

    renderPassenger() {
        this.passengers.forEach((passenger) => {
            const passengerLi = document.createElement('li')
            passengerLi.innerHTML = passengerTemplate(passenger)
            this.container.appendChild(passengerLi)
        })
    }
}