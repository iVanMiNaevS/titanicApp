import { PassengerManager } from "./managers/passengerManager.js";

class TitanicApp {
    constructor() {
        this.passengerManager = new PassengerManager()
    }

    async init() {
        this.passengerManager.init()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new TitanicApp();
    app.init();
});