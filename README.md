# Приложение Поиска пассажиров на "Титанике"

## Ссылка на сайт [ivanminaevs.github.io/titanicApp/](ivanminaevs.github.io/titanicApp/)

##

## Функционал

1. Поиск пассажиров по их "Имени" в поисковой строке
2. Возможность фильтрации пассажиров по возрасту (диапазон), по статусу (выжил - не выжил), класс пассажира, по гендеру.
3. Ленивый рендеринг пассажиров (по 20 пассажиров)

## Код

### Логика пассажиров

#### Загрузка

Загрузка пассажиров прописана в managers/passangerManager.js
Отображение следующей порции пассажиров происходит при достижении нижней части экрана

`window.addEventListener('scroll', () => this.handleScroll());`

```javascript
handleScroll() {

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 100 && this.canLoadMore()) {
            this.loadMorePassengers();
        }
    }
```

```javascript
    loadMorePassengers() {
        if (!this.canLoadMore()) return;

        const startIndex = this.currentCountPassengers;
        const endIndex = Math.min(startIndex + this.batchSize, this.currentDataSource.length);

        const newPassengers = this.currentDataSource.slice(startIndex, endIndex);
        this.setDisplayedPassengers([...this.displayedPassengers, ...newPassengers], endIndex);

    }
```

#### Рендер

Генерация html элемента с контентом происходит в templates/passangerTemplate.js

```javascript
passengerLi.innerHTML = `
			<article class="passenger__item">
				<div class="passenger__header">
					<h3 class="passenger__name">${passenger.name}</h3>
					<p class="passenger__status ${passenger.survived ? "survived" : "not-survived"}">
					${passenger.survived ? "ВЫЖИЛ" : "НЕ ВЫЖИЛ"}
					</p>
				</div>
				<div class="passenger__details">
					<div class="passenger__info">
						<span class="passenger__gender">${passenger.gender === "female" ? "Ж" : "М"}</span>
						<span class="passenger__age">${age}</span>
						<span class="passenger__class">${passenger.class}</span>
					</div>
					<p class="passenger__ticket">билет: ${passenger.ticket}</div>
				</div>
			</article>
        `;
```

### Логика фильтров

Поиск по имени запускается: клик на enter, снятие фокуса с поля ввода, клик на конпку поиска

Фильтры изначально скрыты. При клике на плашку фильтры раскроется тело фильтров со всеми фильтрами.
Фильтры применяются при нажатии на checkbox
Фильтр по возрасту применяется при снятии фокуса с одного из полей ввода.

Фильтрация прописана в managers/filtersManager.js
Логика фильтров вынесена в отдельный файл utils/filterPassanger.js

#### Рендер

Генерация html элемента с контентом происходит в templates/filtersTemplate.js

```javascript
let filtersHTML = `
            <div class="filter__group">
                <h3>Возраст</h3>
                    <div class="age__inputs">
                        <input type="number" id="ageMin" placeholder="От" min="0" max="100">
                        <input type="number" id="ageMax" placeholder="До" min="0" max="100">
                    </div>
            </div>
        `;

Object.entries(filtersConfig).forEach(([filterKey, config]) => {
	filtersHTML += `
                <div class="filter__group">
                    <h3>${config.title}</h3>
                    <div class="filter__options">
                        ${Object.entries(config.options)
													.map(
														([key, label]) => `
                            <div class="filter__option">
                                <input type="checkbox" id="${filterKey}-${key}"
                                       data-filter="${filterKey}" data-value="${key}">
                                <label for="${filterKey}-${key}">${label}</label>
                            </div>
                        `
													)
													.join("")}
                    </div>
                </div>
            `;
});

filtersHTML += `<button class="reset-filters" id="resetFilters">Сбросить фильтры</button>`;
```

#### Конфиг фильтров (какие будут фильтры)

По каким свойствам и какие будут фильтры указано в configs/filterConfig.js

```Javascript
export const filtersConfig = {
    gender: {
        title: 'Пол',
        options: {
            male: 'Мужской',
            female: 'Женский'
        }
    },
    survived: {
        title: 'Статус',
        options: {
            survived: 'Выжил',
            notSurvived: 'Не выжил'
        }
    },
    passengerClass: {
        title: 'Класс',
        options: {
            first: 'Первый',
            second: 'Второй',
            third: 'Третий'
        }
    }
};
```
