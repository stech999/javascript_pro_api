// Вы разрабатываете веб - страницу для отображения расписания занятий в спортивном клубе.Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

// 1. Создайте веб - страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON - данных.Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие.Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись".После отмены записи, обновите количество записанных участников и состояние кнопки.

// 6. Все изменения(запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

const db = './db.json';

async function processingJson(data) {
    try {
        const response = await fetch(data);
        const getData = await response.json();
        return getData;
    } catch (error) {
        console.log(error.message);
    }
}

function getDataContent(data) {
    const viewScheduleEl = document.getElementById('viewSchedule');
    const classScheduleEl = document.querySelector('.classSchedule');

    data.forEach(el => {
        const clone = document.importNode(classScheduleEl.content, true);
        const titleEl = clone.getElementById('title');
        const timeEl = clone.getElementById('time');
        const maxCountVisitorsEl = clone.getElementById('maxCountVisitors');
        const recordVisitorsEl = clone.getElementById('recordVisitors');
        const recordBtnEl = clone.getElementById('recordBtn');
        const removeBtnEl = clone.getElementById('removeBtn');

        titleEl.textContent = el.title;
        timeEl.textContent = el.time;
        maxCountVisitorsEl.textContent = el.maxCountVisitors;
        recordVisitorsEl.textContent = el.recordVisitors;

        let countVisitors = el.recordVisitors;
        let count = 0;
        removeBtnEl.disabled = true;

        if (countVisitors >= el.maxCountVisitors) {
            recordBtnEl.disabled = true;
        }

        recordBtnEl.addEventListener('click', function () {
            if (count <= 1) {
                recordBtnEl.disabled = true;
                removeBtnEl.disabled = false;
                count++;
            }
            countVisitors++;
            recordVisitorsEl.textContent = countVisitors;
        });

        removeBtnEl.addEventListener('click', function () {
            countVisitors--;
            recordVisitorsEl.textContent = countVisitors;
            count--;
            if (count == 0) {
                removeBtnEl.disabled = true;
                recordBtnEl.disabled = false;
            }
        });

        viewScheduleEl.appendChild(clone);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const getDB = await processingJson(db);
        getDataContent(getDB);
    } catch (error) {
        console.error('Ошибка при загрузке контента:', error);
    }
});