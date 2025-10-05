import { getClassKey } from "./getClassKey.js";

export function filterPassengers(filters, passengers, hasAnyFilterSelected) {


    return passengers.filter(passenger => {
        if (filters.name && !passenger.name.toLowerCase().includes(filters.name)) {
            return false;
        }

        if (hasAnyFilterSelected(filters.gender)) {
            const genderKey = passenger.gender === 'male' ? 'male' : 'female';
            if (!filters.gender[genderKey]) {
                return false;
            }
        }

        if (hasAnyFilterSelected(filters.survived)) {
            const survivedKey = passenger.survived ? 'survived' : 'notSurvived';
            if (!filters.survived[survivedKey]) {
                return false;
            }
        }

        if (hasAnyFilterSelected(filters.passengerClass)) {
            const classKey = getClassKey(passenger.class);
            if (!filters.passengerClass[classKey]) {
                return false;
            }
        }

        const age = passenger.age;
        if (age !== null && age !== undefined) {
            const minAge = filters.age.min ? parseInt(filters.age.min) : 0;
            const maxAge = filters.age.max ? parseInt(filters.age.max) : 100;

            if ((filters.age.min && age < minAge) || (filters.age.max && age > maxAge)) {
                return false;
            }
        }

        return true;
    });
}