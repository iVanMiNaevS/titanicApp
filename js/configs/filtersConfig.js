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
export const getDefaultFilters = (isSafeName = false, name = '') => ({
    name: isSafeName ? name : '',
    gender: {
        male: false,
        female: false
    },
    survived: {
        survived: false,
        notSurvived: false
    },
    passengerClass: {
        first: false,
        second: false,
        third: false
    },
    age: {
        min: '',
        max: ''
    }
});
