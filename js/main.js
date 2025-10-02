import { FiltersManager } from "./managers/filtersManager.js";
import { PassengerManager } from "./managers/passengerManager.js";

class TitanicApp {
    constructor() {
        this.passengerManager = new PassengerManager()
        this.filtersManager = new FiltersManager(this.passengerManager)
    }

    async init() {
        await this.passengerManager.init()
        this.filtersManager.init()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new TitanicApp();
    app.init();
});