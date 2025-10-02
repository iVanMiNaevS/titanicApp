export function passengerTemplate(passenger) {

	const age = passenger.age !== null && passenger.age !== undefined ?
		Math.floor(passenger.age) : '?';

	return `
			<article class="passenger__item">
				<div class="passenger__header">
					<h3 class="passenger__name">${passenger.name}</h3>
					<p class="passenger__status ${passenger.survived ? 'survived' : 'not-survived'}">
					${passenger.survived ? 'ВЫЖИЛ' : 'НЕ ВЫЖИЛ'}
					</p>
				</div>
				<div class="passenger__details">
					<div class="passenger__info">
						<span class="passenger__gender">${passenger.gender === 'female' ? 'Ж' : 'М'}</span>
						<span class="passenger__age">${age}</span>
						<span class="passenger__class">${passenger.class}</span>
					</div>
					<p class="passenger__ticket">билет: ${passenger.ticket}</div>
				</div>
			</article>
        `;

}