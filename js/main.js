import { PassengerManager } from "./managers/passengerMassenger.js";

class TitanicApp {
    constructor() {
        this.passengerManager = new PassengerManager()
    }

    async init() {
        await this.passengerManager.fetchJsonPassengers()
        this.passengerManager.showAllPassengers()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new TitanicApp();
    app.init();
});